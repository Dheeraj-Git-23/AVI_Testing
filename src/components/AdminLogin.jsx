import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://avishkar-ten-backend.onrender.com";

function AdminLogin() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("username", username);
            formData.append("password", password);

            const response = await fetch(
                `${API_URL}/api/admin/login`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Invalid admin credentials."
                );
            }

            localStorage.setItem(
                "adminToken",
                data.token
            );

            navigate("/admin/dashboard");

        } catch (error) {
            setError(
                error.message || "Login failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                background: "#f5f7fb",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "32px",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.08)",
                }}
            >
                <h1
                    style={{
                        marginBottom: "8px",
                    }}
                >
                    Admin Login
                </h1>

                <p
                    style={{
                        color: "#64748b",
                        marginBottom: "24px",
                    }}
                >
                    Sign in to access the lead management dashboard.
                </p>

                {error && (
                    <div
                        style={{
                            marginBottom: "16px",
                            padding: "12px",
                            borderRadius: "8px",
                            background: "#fef2f2",
                            color: "#dc2626",
                            border: "1px solid #fecaca",
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <label
                        style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                        }}
                    >
                        Username
                    </label>

                    <input
                        type="text"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        placeholder="Enter username"
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "16px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            boxSizing: "border-box",
                        }}
                    />

                    <label
                        style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                        }}
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Enter password"
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "20px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            boxSizing: "border-box",
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#1e3a8a",
                            color: "#ffffff",
                            fontWeight: "600",
                            cursor: loading
                                ? "not-allowed"
                                : "pointer",
                        }}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign in"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AdminLogin;