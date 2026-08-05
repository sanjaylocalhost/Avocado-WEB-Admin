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

// Add Inquiry Modal Component
function AddInquiryModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isOpen) {
      api.get("/products")
        .then(res => setProducts(res.data))
        .catch(err => console.error("Failed to load products"));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        quantity: formData.quantity,
        message: formData.message,
      };

      // Only include product if selected
      if (formData.product && formData.product.trim() !== "") {
        data.product = formData.product;
      }

      const response = await api.post("/inquiries", data);
      onSuccess(response.data);
      onClose();
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        product: "",
        quantity: "",
        message: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create inquiry");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl text-ink">Add New Inquiry</h2>
          <button
            onClick={onClose}
            className="text-ink/60 hover:text-ink transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-line px-3 py-2 bg-white text-sm"
              placeholder="Customer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-line px-3 py-2 bg-white text-sm"
              placeholder="customer@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-line px-3 py-2 bg-white text-sm"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">
              Product (Optional)
            </label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full rounded-lg border border-line px-3 py-2 bg-white text-sm"
            >
              <option value="">No product</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full rounded-lg border border-line px-3 py-2 bg-white text-sm"
              placeholder="Quantity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full rounded-lg border border-line px-3 py-2 bg-white text-sm"
              placeholder="Inquiry message..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-skin text-cream rounded-full font-medium hover:bg-skin/90 transition-colors disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Inquiry"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-line rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-skin text-cream rounded-full font-medium hover:bg-skin/90 transition-colors"
          >
            + Add Inquiry
          </button>
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

      {/* Table View */}
      {status === "ready" && inquiries.length > 0 && (
        <div className="bg-white rounded-2xl border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-line">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-ink/60 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-ink/60 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-ink/60 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-ink/60 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-ink/60 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-ink/60 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-ink">{inq.name}</p>
                        <p className="text-sm text-ink/60">{inq.email}</p>
                        {inq.phone && (
                          <p className="text-xs text-ink/40">{inq.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {inq.product ? (
                        <span className="text-sm text-ink/80">
                          {inq.product.name}
                        </span>
                      ) : (
                        <span className="text-sm text-ink/40">—</span>
                      )}
                      {inq.quantity && (
                        <p className="text-xs text-ink/40">Qty: {inq.quantity}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-ink/80 max-w-xs truncate">
                        {inq.message}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiry(inq._id, { status: e.target.value })}
                        disabled={savingId === inq._id}
                        className={`rounded-full px-3 py-1 text-xs font-medium border-0 ${
                          statusColors[inq.status]
                        } ${savingId === inq._id ? "opacity-50" : ""}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-ink/60">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-ink/40">
                        {new Date(inq.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => {
                          const noteSection = document.getElementById(`note-${inq._id}`);
                          if (noteSection) {
                            noteSection.classList.toggle('hidden');
                          }
                        }}
                        className="text-sm text-skin hover:text-skin/80 transition-colors"
                      >
                        Add Note
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note sections below the table */}
          {inquiries.map((inq) => (
            <div
              key={`note-${inq._id}`}
              id={`note-${inq._id}`}
              className="hidden border-t border-line px-4 py-3 bg-gray-50/50"
            >
              <AdminNoteField 
                inquiry={inq} 
                onSave={(note) => updateInquiry(inq._id, { adminNote: note })} 
              />
            </div>
          ))}
        </div>
      )}

      {/* Add Inquiry Modal */}
      <AddInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          load();
        }}
      />
    </div>
  );
}