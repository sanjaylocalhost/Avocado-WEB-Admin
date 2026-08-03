// pages/AdminLeads.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get("/leads");
      setLeads(res.data?.leads || []);
    } catch (err) {
      setError("Failed to load leads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await api.put(`/leads/${id}`, { status });
      fetchLeads();
    } catch (err) {
      alert("Failed to update lead status");
    }
  };

  const filteredLeads = filter === "all" 
    ? leads 
    : leads.filter(lead => lead.status === filter);

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-100 text-blue-700",
      contacted: "bg-yellow-100 text-yellow-700",
      qualified: "bg-green-100 text-green-700",
      closed: "bg-green-600 text-white",
      lost: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-skin border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-ink/60">Loading leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchLeads}
          className="mt-4 px-4 py-2 bg-skin text-cream rounded-full hover:bg-skin-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-ink">Lead Management</h1>
          <p className="text-ink/60 mt-1">Track and manage your leads</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-line px-3 py-2 bg-white text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="closed">Closed</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-line">
          <p className="text-2xl mb-2">👥</p>
          <p className="text-ink/60">No leads found</p>
          <p className="text-sm text-ink/40 mt-1">
            {filter !== "all" ? "Try changing the status filter" : "Leads will appear here"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredLeads.map((lead) => (
            <div key={lead._id} className="bg-white rounded-2xl border border-line p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-medium text-ink">{lead.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                    <p className="text-ink/60">
                      <span className="font-medium">Email:</span> {lead.email}
                    </p>
                    {lead.phone && (
                      <p className="text-ink/60">
                        <span className="font-medium">Phone:</span> {lead.phone}
                      </p>
                    )}
                    {lead.interest && (
                      <p className="text-ink/60">
                        <span className="font-medium">Interest:</span> {lead.interest}
                      </p>
                    )}
                    {lead.source && (
                      <p className="text-ink/60">
                        <span className="font-medium">Source:</span> {lead.source}
                      </p>
                    )}
                  </div>
                  
                  {lead.message && (
                    <p className="text-ink/80 text-sm mt-2 border-t border-line pt-2">
                      {lead.message}
                    </p>
                  )}
                  
                  <p className="text-ink/40 text-xs mt-2">
                    Added: {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <select
                  value={lead.status}
                  onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                  className="rounded-lg border border-line px-3 py-1.5 bg-white text-sm"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}