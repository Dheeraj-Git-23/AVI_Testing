from datetime import date
import os
import re
import secrets
import sqlite3
from pathlib import Path

from fastapi import FastAPI, Form, HTTPException ,Query, Header , Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# --------------------------------------------------
# APP
# --------------------------------------------------

app = FastAPI(
    title="Avishkar-TEN Lead API",
    version="1.0.0",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=[
        "GET",
        "POST",
        "PATCH",
        "OPTIONS",
    ],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR / "leads.db"

ADMIN_USERNAME = os.getenv(
    "ADMIN_USERNAME",
    "admin",
)

ADMIN_PASSWORD = os.getenv(
    "ADMIN_PASSWORD",
    "change-this-password",
)

ADMIN_TOKEN = os.getenv(
    "ADMIN_TOKEN",
    "dev-admin-token",
)

def require_admin(
    authorization: str | None = Header(default=None),
):
    expected = f"Bearer {ADMIN_TOKEN}"

    if not authorization or not secrets.compare_digest(
        authorization,
        expected,
    ):
        raise HTTPException(
            status_code=401,
            detail="Admin authentication required.",
        )

    return 

def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_connection()

  
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS demo_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            school_name TEXT NOT NULL,
            location TEXT NOT NULL,
            phone TEXT NOT NULL,
            demo_date TEXT NOT NULL,
            consent INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'NEW',
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    columns = connection.execute(
        "PRAGMA table_info(demo_requests)"
    ).fetchall()

    column_names = {column["name"] for column in columns}

    # Safely upgrade an existing database.
    if "status" not in column_names:
        connection.execute(
            """
            ALTER TABLE demo_requests
            ADD COLUMN status TEXT NOT NULL DEFAULT 'NEW'
            """
        )

    connection.commit()
    connection.close()

initialize_database()


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "Avishkar-TEN Lead API",
    }

# --------------------------------------------------
# ADMIN LOGIN
# --------------------------------------------------

@app.post("/api/admin/login")
def admin_login(
    username: str = Form(...),
    password: str = Form(...),
):
    username_valid = secrets.compare_digest(
        username,
        ADMIN_USERNAME,
    )

    password_valid = secrets.compare_digest(
        password,
        ADMIN_PASSWORD,
    )

    if not username_valid or not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid admin credentials.",
        )

    return {
        "success": True,
        "message": "Admin login successful.",
        "token": ADMIN_TOKEN,
    }

# --------------------------------------------------
# CREATE DEMO REQUEST
# --------------------------------------------------

@app.post("/api/demo-request")
def create_demo_request(
    schoolName: str = Form(...),
    location: str = Form(...),
    phone: str = Form(...),
    demoDate: str = Form(...),
    consent: str = Form(...),
):
       # -----------------------------
    # Basic validation
    # -----------------------------

    school_name = schoolName.strip()
    school_location = location.strip()
    phone_number = phone.strip()

    # School name
    if not school_name:
        raise HTTPException(
            status_code=400,
            detail="School name is required.",
        )

    if len(school_name) < 2:
        raise HTTPException(
            status_code=400,
            detail="School name is too short.",
        )

    if len(school_name) > 150:
        raise HTTPException(
            status_code=400,
            detail="School name is too long.",
        )

    # City / State
    if not school_location:
        raise HTTPException(
            status_code=400,
            detail="City / State is required.",
        )

    if len(school_location) < 2:
        raise HTTPException(
            status_code=400,
            detail="City / State is too short.",
        )

    if len(school_location) > 100:
        raise HTTPException(
            status_code=400,
            detail="City / State is too long.",
        )

    # Phone number
    # Accept:
    # 9876543210
    # +919876543210
    # +91 9876543210
    # 09876543210
    normalized_phone = re.sub(r"[\s\-()]", "", phone_number)

    if normalized_phone.startswith("+91"):
        normalized_phone = normalized_phone[3:]
    elif normalized_phone.startswith("91") and len(normalized_phone) == 12:
        normalized_phone = normalized_phone[2:]
    elif normalized_phone.startswith("0") and len(normalized_phone) == 11:
        normalized_phone = normalized_phone[1:]

    if not re.fullmatch(r"[6-9]\d{9}", normalized_phone):
        raise HTTPException(
            status_code=400,
            detail="Please enter a valid Indian 10-digit mobile number.",
        )

    # Consent
    if consent.lower() not in {"yes", "true", "on", "1"}:
        raise HTTPException(
            status_code=400,
            detail="Consent is required.",
        )

    # Demo date
    try:
        requested_date = date.fromisoformat(demoDate)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid demo date.",
        )

    if requested_date < date.today():
        raise HTTPException(
            status_code=400,
            detail="Demo date cannot be in the past.",
        )
    # -----------------------------
    # Save lead
    # -----------------------------

    connection = get_connection()

    cursor = connection.execute(
        """
        INSERT INTO demo_requests (
            school_name,
            location,
            phone,
            demo_date,
            consent,
            status
        )
        VALUES (?, ?, ?, ?, ?,?)
        """,
        (
            school_name,
            school_location,
            phone_number,
            requested_date.isoformat(),
            1,
            "NEW",
        ),
    )

    connection.commit()

    lead_id = cursor.lastrowid

    connection.close()

    # -----------------------------
    # Response
    # -----------------------------

    return {
        "success": True,
        "message": "Demo request received.",
        "lead_id": lead_id,
    }

ALLOWED_STATUSES = {
    "NEW",
    "CONTACTED",
    "DEMO SCHEDULED",
    "COMPLETED",
    "CLOSED",
}


class StatusUpdate(BaseModel):
    status: str

# --------------------------------------------------
# UPDATE LEAD STATUS
# --------------------------------------------------

@app.patch("/api/demo-requests/{lead_id}/status")
def update_demo_request_status(
    lead_id: int,
    status_update: StatusUpdate,
    _: bool = Depends(require_admin),
):
    new_status = status_update.status.strip().upper()

    # Validate status
    if new_status not in ALLOWED_STATUSES:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Invalid lead status.",
                "allowed_statuses": sorted(ALLOWED_STATUSES),
            },
        )

    connection = get_connection()

    # Check that the lead exists
    lead = connection.execute(
        """
        SELECT id
        FROM demo_requests
        WHERE id = ?
        """,
        (lead_id,),
    ).fetchone()

    if lead is None:
        connection.close()

        raise HTTPException(
            status_code=404,
            detail="Lead not found.",
        )

    # Update status
    connection.execute(
        """
        UPDATE demo_requests
        SET status = ?
        WHERE id = ?
        """,
        (new_status, lead_id),
    )

    connection.commit()
    connection.close()

    return {
        "success": True,
        "message": "Lead status updated.",
        "lead_id": lead_id,
        "status": new_status,
    }

# --------------------------------------------------
# VIEW LEADS
# --------------------------------------------------

@app.get("/api/demo-requests")
def get_demo_requests(_: bool = Depends(require_admin),):
    connection = get_connection()

    rows = connection.execute(
    """
    SELECT
        id,
        school_name,
        location,
        phone,
        demo_date,
        status,
        created_at
    FROM demo_requests
    ORDER BY id DESC
    """
).fetchall()

    connection.close()

    return {
        "count": len(rows),
        "leads": [dict(row) for row in rows],
    }