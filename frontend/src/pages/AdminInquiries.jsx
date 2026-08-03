// pages/AdminInquiries.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminNoteField({ inquiry, onSave }) {
  const [note, setNote] = useState(inquiry.adminNote || "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(note);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-4 border-t border-line pt-3 flex gap-2">
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Internal note or reply visible to the customer…"
        className="flex-1 rounded-lg border border-line px-3 py-2 bg-white text-sm"
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 rounded-full border border-skin text-skin text-sm font-medium hover:bg-skin hover:text-cream transition-colors disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save note"}
      </button>
    </div>
  );
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState("");
  const [savingId, setSavingId] = useState(null);

  function load() {
    setStatus("loading");
    api
      .get("/inquiries", { params: filter ? { status: filter } : {} })
      .then((res) => {
        setInquiries(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }

  useEffect(load, [filter]);

  async function updateInquiry(id, patch) {
    setSavingId(id);
    try {
      await api.put(`/inquiries/${id}`, patch);
      load();
    } finally {
      setSavingId(null);
    }
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    contacted: "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-ink">Inquiries Management</h1>
          <p className="text-ink/60 mt-1">Manage customer inquiries and communications</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-line px-3 py-2 bg-white text-sm"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {status === "loading" && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-skin border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-ink/60">Loading inquiries…</p>
        </div>
      )}
      
      {status === "error" && (
        <div className="text-center py-12">
          <p className="text-ink/60">Couldn't load inquiries.</p>
        </div>
      )}
      
      {status === "ready" && inquiries.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-line">
          <p className="text-2xl mb-2">📭</p>
          <p className="text-ink/60">No inquiries here yet.</p>
        </div>
      )}

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq._id} className="border border-line rounded-2xl p-5 bg-white/70">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-ink">
                    {inq.name}
                  </p>
                  <span className="text-ink/50 text-sm">· {inq.email}</span>
                  {inq.phone && (
                    <span className="text-ink/50 text-sm">· {inq.phone}</span>
                  )}
                </div>
                {inq.product && (
                  <p className="font-mono text-xs uppercase tracking-wide text-seed mt-1">
                    Product: {inq.product.name}
                  </p>
                )}
                <p className="text-ink/80 mt-2">{inq.message}</p>
                {inq.quantity && (
                  <p className="text-ink/50 text-sm mt-1">Quantity: {inq.quantity}</p>
                )}
                <p className="text-ink/40 text-xs mt-2">
                  {new Date(inq.createdAt).toLocaleString()}
                </p>
              </div>

              <select
                value={inq.status}
                onChange={(e) => updateInquiry(inq._id, { status: e.target.value })}
                disabled={savingId === inq._id}
                className={`rounded-lg border px-3 py-1.5 bg-white text-sm ${
                  savingId === inq._id ? "opacity-50" : ""
                }`}
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <AdminNoteField inquiry={inq} onSave={(note) => updateInquiry(inq._id, { adminNote: note })} />
          </div>
        ))}
      </div>
    </div>
  );
}