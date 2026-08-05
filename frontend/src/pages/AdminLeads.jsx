import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FaDownload, FaFilter, FaSearch, FaUserPlus, FaPlus } from "react-icons/fa";

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-green-100 text-green-700",
  proposal: "bg-purple-100 text-purple-700",
  negotiation: "bg-orange-100 text-orange-700",
  closed: "bg-green-600 text-white",
  lost: "bg-red-100 text-red-700",
};

const sourceIcons = {
  website: "🌐",
  referral: "🤝",
  social: "📱",
  email: "✉️",
  call: "📞",
  other: "📌",
};

// LeadModal Component
const LeadModal = ({ lead, onClose, onSave }) => {
  const [form, setForm] = useState(
    lead || {
      name: "",
      email: "",
      phone: "",
      location: "",
      source: "website",
      status: "new",
      interest: "",
      notes: "",
      followUpDate: "",
      productsInterested: [],
      assignedTo: "",
    }
  );
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const payload = { ...form };
      
      // Clean up empty fields
      if (!payload.location) delete payload.location;
      if (!payload.notes) delete payload.notes;
      if (!payload.followUpDate) delete payload.followUpDate;
      if (!payload.interest) delete payload.interest;
      if (!payload.assignedTo) delete payload.assignedTo;
      
      if (lead) {
        await api.put(`/leads/${lead._id}`, payload);
      } else {
        await api.post("/leads", payload);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving lead:", error);
      alert(error.response?.data?.message || "Failed to save lead. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-display">
            {lead ? "Edit Lead" : "Add New Lead"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">Source</label>
              <select
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
              >
                <option value="website">🌐 Website</option>
                <option value="referral">🤝 Referral</option>
                <option value="social">📱 Social Media</option>
                <option value="email">✉️ Email</option>
                <option value="call">📞 Phone Call</option>
                <option value="other">📌 Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">Interest</label>
              <select
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
              >
                <option value="">Select interest</option>
                <option value="seed">🌱 Seeds</option>
                <option value="plant">🌿 Plants</option>
                <option value="both">🌱🌿 Both</option>
                <option value="bulk">📦 Bulk Order</option>
                <option value="consultation">💡 Consultation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
            >
              <option value="new">🆕 New</option>
              <option value="contacted">📞 Contacted</option>
              <option value="qualified">✅ Qualified</option>
              <option value="proposal">📄 Proposal</option>
              <option value="negotiation">🤝 Negotiation</option>
              <option value="closed">🎯 Closed</option>
              <option value="lost">❌ Lost</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">Assigned To</label>
            <input
              type="text"
              value={form.assignedTo || ""}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
              placeholder="Team member name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">Notes</label>
            <textarea
              rows="3"
              value={form.notes || ""}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
              placeholder="Add notes about this lead..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">Follow-up Date</label>
            <input
              type="date"
              value={form.followUpDate ? new Date(form.followUpDate).toISOString().split("T")[0] : ""}
              onChange={(e) => setForm({ ...form, followUpDate: e.target.value })}
              className="w-full rounded-lg border border-line px-3 py-2 focus:ring-2 focus:ring-skin focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-line">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark disabled:opacity-60 transition-colors"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Saving...
                </span>
              ) : (
                lead ? "Update Lead" : "Create Lead"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-line text-ink/70 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  
  const { user } = useAuth();

  useEffect(() => {
    fetchLeads();
  }, [filter, search]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter) params.status = filter;
      if (search) params.search = search;
      
      const response = await api.get("/leads", { params });
      setLeads(response.data.leads);
      setStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      await api.put(`/leads/${leadId}`, { status: newStatus });
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm("Delete this lead? This action cannot be undone.")) return;
    try {
      await api.delete(`/leads/${leadId}`);
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  return (
    <div>
      {/* Header with Stats */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lead Management</h1>
            <p className="text-gray-500 text-sm">Track and manage your leads effectively</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1 text-sm">
              <FaDownload size={14} />
              Export
            </button>
            {/* 👇 UPDATED: More prominent Add Lead button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-skin to-skin-dark text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium"
            >
              <FaPlus size={16} />
              Add Lead
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-line shadow-sm">
          <p className="text-xs text-ink/50">Total</p>
          <p className="text-2xl font-bold text-ink">{stats.total || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-line shadow-sm">
          <p className="text-xs text-ink/50">New</p>
          <p className="text-2xl font-bold text-blue-600">{stats.new || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-line shadow-sm">
          <p className="text-xs text-ink/50">Contacted</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.contacted || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-line shadow-sm">
          <p className="text-xs text-ink/50">Qualified</p>
          <p className="text-2xl font-bold text-green-600">{stats.qualified || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-line shadow-sm">
          <p className="text-xs text-ink/50">Closed</p>
          <p className="text-2xl font-bold text-green-800">{stats.closed || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-line shadow-sm">
          <p className="text-xs text-ink/50">Lost</p>
          <p className="text-2xl font-bold text-red-600">{stats.lost || 0}</p>
        </div>
      </div>

      {/* Filters and Add Lead Button */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1 min-w-[200px] relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-line pl-10 pr-3 py-2 bg-white text-sm focus:ring-2 focus:ring-skin focus:border-transparent"
          />
        </div>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-line px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-skin focus:border-transparent"
        >
          <option value="">All Statuses</option>
          <option value="new">🆕 New</option>
          <option value="contacted">📞 Contacted</option>
          <option value="qualified">✅ Qualified</option>
          <option value="proposal">📄 Proposal</option>
          <option value="negotiation">🤝 Negotiation</option>
          <option value="closed">🎯 Closed</option>
          <option value="lost">❌ Lost</option>
        </select>

        {/* 👇 UPDATED: Add Lead button in filters section */}
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-skin to-skin-dark text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium"
        >
          <FaPlus size={16} />
          Add Lead
        </button>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-skin border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-ink/60">Loading leads...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream/50">
                <tr className="text-left text-ink/50 font-mono text-xs uppercase border-b border-line">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Interest</th>
                  <th className="py-3 px-4">Follow-up</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-b border-line/60 hover:bg-cream/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-ink">{lead.name}</p>
                        <p className="text-xs text-ink/50">{lead.location || "N/A"}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs">
                        <p className="text-ink">{lead.email}</p>
                        <p className="text-ink/50">{lead.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-lg" title={lead.source}>
                        {sourceIcons[lead.source] || "📌"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[lead.status]}`}
                      >
                        <option value="new">🆕 New</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="qualified">✅ Qualified</option>
                        <option value="proposal">📄 Proposal</option>
                        <option value="negotiation">🤝 Negotiation</option>
                        <option value="closed">🎯 Closed</option>
                        <option value="lost">❌ Lost</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {lead.interest || "Not specified"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingLead(lead)}
                          className="text-skin hover:underline text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          className="text-red-600 hover:underline text-xs font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-ink/50">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">📋</span>
                        <p>No leads found. Click <strong>"Add Lead"</strong> to create your first lead!</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <LeadModal
          onClose={() => setShowAddModal(false)}
          onSave={fetchLeads}
        />
      )}

      {editingLead && (
        <LeadModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={fetchLeads}
        />
      )}
    </div>
  );
}