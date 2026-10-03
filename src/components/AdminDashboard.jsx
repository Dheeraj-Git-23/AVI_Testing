import { useEffect, useMemo, useState } from "react";

import {
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Phone,
  Search,
  Users,
} from "lucide-react";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


function AdminDashboard() {
     const token = localStorage.getItem("adminToken");
     const [error, setError] = useState("");
     const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    function handleLogout() {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
}
    const updateLeadStatus = async (leadId, newStatus) => {
    try {
        console.log("2. UPDATE FUNCTION:", {
            leadId,
            newStatus,
        });

        const token = localStorage.getItem("adminToken");

const response = await fetch(
    `${API_URL}/api/demo-requests/${leadId}/status`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            status: newStatus,
        }),
    }
);

if (response.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    return;
}
        const data = await response.json();

        console.log("STATUS API RESPONSE:", data);

        if (!response.ok) {
            throw new Error(
                data.detail?.message ||
                data.detail ||
                "Failed to update status."
            );
        }

        setLeads((currentLeads) =>
            currentLeads.map((lead) =>
                lead.id === leadId
                    ? {
                          ...lead,
                          status: newStatus,
                      }
                    : lead
            )
        );

        console.log("STATUS UPDATED SUCCESSFULLY");

    } catch (error) {
        console.error("STATUS UPDATE ERROR:", error);
    }
};
    useEffect(() => {
  async function fetchLeads() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

const response = await fetch(
    `${API_URL}/api/demo-requests`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);

if (response.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    return;
}

if (!response.ok) {
    throw new Error("Failed to fetch leads.");
}

      const data = await response.json();

      setLeads(data.leads);
    } catch (err) {
      console.error(err);
      setError("Unable to load leads from the backend.");
    } finally {
      setLoading(false);
    }
  }

  fetchLeads();
}, []);
const stats = useMemo(() => {
  return {
    total: leads.length,

    new: leads.filter(
      (lead) => lead.status === "NEW"
    ).length,

    contacted: leads.filter(
      (lead) => lead.status === "CONTACTED"
    ).length,

    scheduled: leads.filter(
      (lead) => lead.status === "DEMO SCHEDULED"
    ).length,
  };
}, [leads]);
const filteredLeads = useMemo(() => {
  return leads.filter((lead) => {
    const matchesStatus =
      selectedStatus === "ALL" ||
      lead.status === selectedStatus;

    const search = searchTerm
      .trim()
      .toLowerCase();

    const matchesSearch =
      !search ||
      lead.school_name.toLowerCase().includes(search) ||
      lead.location.toLowerCase().includes(search) ||
      lead.phone.toLowerCase().includes(search);

    return matchesStatus && matchesSearch;
  });
}, [
  leads,
  selectedStatus,
  searchTerm,
]);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
                <BarChart3 size={20} />
              </div>

              <div>
                <h1 className="text-lg font-bold text-blue-950">
                  Avishkar-TEN
                </h1>

                <p className="text-xs font-medium text-slate-500">
                  Lead Management
                </p>

              </div>
            </div>
          </div>

          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            

            <button
                type="button"
                onClick={handleLogout}
            >
                Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Page heading */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
            Operations
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Lead Management
          </h2>

          <p className="mt-2 max-w-2xl text-slate-600">
            Monitor and manage boardroom demo requests submitted through the
            Avishkar-TEN website.
          </p>
        </div>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users size={20} />}
            label="Total Leads"
            value={stats.total}
          />

          <StatCard
            icon={<Clock3 size={20} />}
            label="New"
            value={stats.new}
          />

          <StatCard
            icon={<Phone size={20} />}
            label="Contacted"
            value={stats.contacted}
          />

          <StatCard
            icon={<CalendarDays size={20} />}
            label="Demo Scheduled"
            value={stats.scheduled}
          />
        </section>

        {/* Controls */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search school, city or phone..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Status filters */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <FilterButton
                active={selectedStatus === "ALL"}
                onClick={() => setSelectedStatus("ALL")}
                >
                All
              </FilterButton>

                <FilterButton
                active={selectedStatus === "NEW"}
                onClick={() => setSelectedStatus("NEW")}
                >
                New
                </FilterButton>

                <FilterButton
                active={selectedStatus === "CONTACTED"}
                onClick={() => setSelectedStatus("CONTACTED")}
                >
                Contacted
                </FilterButton>

                <FilterButton
                active={selectedStatus === "DEMO SCHEDULED"}
                onClick={() => setSelectedStatus("DEMO SCHEDULED")}
                >
                Scheduled
                </FilterButton>

                <FilterButton
                active={selectedStatus === "COMPLETED"}
                onClick={() => setSelectedStatus("COMPLETED")}
                >
                Completed
                </FilterButton>

                <FilterButton
                active={selectedStatus === "CLOSED"}
                onClick={() => setSelectedStatus("CLOSED")}
                >
                Closed
                </FilterButton>
            </div>
          </div>
        </section>

        {/* Leads */}
        <section className="mt-6 space-y-4">
                {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-medium text-slate-500">
            Loading leads...
            </p>
        </div>
        )}

        {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-semibold text-red-700">
            {error}
            </p>
        </div>
        )}

        {!loading &&
        !error &&
        filteredLeads.map((lead) => (
                <LeadCard
            key={lead.id}
            id={lead.id}
            school={lead.school_name}
            location={lead.location}
            phone={lead.phone}
            demoDate={lead.demo_date}
            status={lead.status}
            onStatusChange={updateLeadStatus}
        />

        ))}

        {!loading &&
        !error &&
        filteredLeads.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="font-semibold text-slate-800">
                No leads found.
            </p>

            <p className="mt-1 text-sm text-slate-500">
                Try changing the search or status filter.
            </p>
            </div>
        )}
        </section>
      </main>
    </div>
  );
}


/* --------------------------------------------------
   STAT CARD
-------------------------------------------------- */

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
          {icon}
        </div>

        <CheckCircle2
          size={18}
          className="text-teal-600"
        />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}


/* --------------------------------------------------
   FILTER BUTTON
-------------------------------------------------- */

function FilterButton({ children, active = false , onClick,}) {
  return (
    <button
       onClick={onClick}
      className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-blue-900 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}


/* --------------------------------------------------
   LEAD CARD
-------------------------------------------------- */

function LeadCard({
    id,
    school,
    location,
    phone,
    demoDate,
    status,
    onStatusChange,
}) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="flex flex-col gap-5">

                {/* Lead information */}
                <div className="min-w-0">

                    <div className="flex items-start gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                            <Building2 size={21} />
                        </div>

                        <div className="min-w-0">

                            <h3 className="break-words text-base font-bold text-slate-950 sm:text-lg">
                                {school}
                            </h3>

                            <p className="mt-1 break-words text-sm text-slate-500">
                                {location}
                            </p>

                        </div>

                    </div>


                    <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6">

                        <span className="flex items-center gap-2 break-all">
                            <Phone size={15} />
                            {phone}
                        </span>

                        <span className="flex items-center gap-2">
                            <CalendarDays size={15} />
                            Demo: {demoDate}
                        </span>

                    </div>

                </div>


                {/* Status */}
                <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">

                    <span
                        className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                            status === "CONTACTED"
                                ? "bg-teal-50 text-teal-700"
                                : status === "DEMO SCHEDULED"
                                ? "bg-blue-50 text-blue-700"
                                : status === "COMPLETED"
                                ? "bg-emerald-50 text-emerald-700"
                                : status === "CLOSED"
                                ? "bg-slate-100 text-slate-700"
                                : "bg-amber-50 text-amber-700"
                        }`}
                    >
                        {status}
                    </span>
                        

                    <select
                        value={status}
                        onChange={(event) => {
                            const newStatus = event.target.value;

                            console.log("1. SELECT:", {
                                id,
                                newStatus,
                            });

                            onStatusChange(id, newStatus);
                        }}
                        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:w-auto"
                    >

                        <option value="NEW">
                            NEW
                        </option>

                        <option value="CONTACTED">
                            CONTACTED
                        </option>

                        <option value="DEMO SCHEDULED">
                            DEMO SCHEDULED
                        </option>

                        <option value="COMPLETED">
                            COMPLETED
                        </option>

                        <option value="CLOSED">
                            CLOSED
                        </option>

                    </select>

                </div>

            </div>

        </article>
    );
}


export default AdminDashboard;