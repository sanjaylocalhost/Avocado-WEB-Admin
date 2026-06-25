import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const emptyProduct = {
  name: "",
  category: "seed",
  description: "",
  features: "",
  price: "",
  unit: "per unit",
  image: "",
  stock: "",
};

function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSave({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock || 0),
        features: form.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      });
    } catch (err) {
      setError(err.response?.data?.message || "Could not save product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 bg-white/70 border border-line rounded-2xl p-5">
      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1">Name</label>
        <input value={form.name} onChange={update("name")} required className="w-full rounded-lg border border-line px-3 py-2 bg-white" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1">Category</label>
        <select value={form.category} onChange={update("category")} className="w-full rounded-lg border border-line px-3 py-2 bg-white">
          <option value="seed">Seed</option>
          <option value="plant">Plant</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-ink/70 mb-1">Description</label>
        <textarea value={form.description} onChange={update("description")} required rows={2} className="w-full rounded-lg border border-line px-3 py-2 bg-white" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-ink/70 mb-1">Features (comma separated)</label>
        <input value={form.features} onChange={update("features")} placeholder="High germination rate, Bulk available" className="w-full rounded-lg border border-line px-3 py-2 bg-white" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1">Price (₹)</label>
        <input type="number" min="0" value={form.price} onChange={update("price")} required className="w-full rounded-lg border border-line px-3 py-2 bg-white" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1">Unit label</label>
        <input value={form.unit} onChange={update("unit")} placeholder="per seed / per plant" className="w-full rounded-lg border border-line px-3 py-2 bg-white" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1">Stock</label>
        <input type="number" min="0" value={form.stock} onChange={update("stock")} className="w-full rounded-lg border border-line px-3 py-2 bg-white" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1">Image URL (optional)</label>
        <input value={form.image} onChange={update("image")} placeholder="https://…" className="w-full rounded-lg border border-line px-3 py-2 bg-white" />
      </div>

      {error && <p className="sm:col-span-2 text-sm text-red-700">{error}</p>}

      <div className="sm:col-span-2 flex gap-3">
        <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-full bg-skin text-cream text-sm font-medium hover:bg-skin-dark transition-colors disabled:opacity-60">
          {saving ? "Saving…" : "Save product"}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-full border border-line text-ink/70 text-sm font-medium">
          Cancel
        </button>
      </div>
    </form>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [editingId, setEditingId] = useState(null); // null = none, "new" = creating
  const [actionError, setActionError] = useState("");

  function load() {
    setStatus("loading");
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }

  useEffect(load, []);

  async function handleSave(product) {
    if (editingId === "new") {
      await api.post("/products", product);
    } else {
      await api.put(`/products/${editingId}`, product);
    }
    setEditingId(null);
    load();
  }

  async function handleDelete(id) {
    setActionError("");
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await api.delete(`/products/${id}`);
      load();
    } catch (err) {
      setActionError(err.response?.data?.message || "Could not delete product.");
    }
  }

  const editingProduct =
    editingId && editingId !== "new" ? products.find((p) => p._id === editingId) : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-2xl text-ink">Products</h2>
        {editingId === null && (
          <button
            onClick={() => setEditingId("new")}
            className="px-4 py-2 rounded-full bg-skin text-cream text-sm font-medium hover:bg-skin-dark transition-colors"
          >
            + Add product
          </button>
        )}
      </div>

      {actionError && <p className="text-sm text-red-700 mb-4">{actionError}</p>}

      {editingId === "new" && (
        <div className="mb-6">
          <ProductForm
            initial={emptyProduct}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      {editingProduct && (
        <div className="mb-6">
          <ProductForm
            initial={{
              ...editingProduct,
              features: (editingProduct.features || []).join(", "),
            }}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      {status === "loading" && <p className="text-ink/60">Loading products…</p>}
      {status === "error" && <p className="text-ink/60">Couldn't load products.</p>}

      {status === "ready" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-ink/50 font-mono text-xs uppercase border-b border-line">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Stock</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-line/60">
                  <td className="py-3 pr-4 font-medium text-ink">{p.name}</td>
                  <td className="py-3 pr-4 capitalize text-ink/70">{p.category}</td>
                  <td className="py-3 pr-4 font-mono text-ink/70">₹{p.price}</td>
                  <td className="py-3 pr-4 text-ink/70">{p.stock}</td>
                  <td className="py-3 pr-4 text-right space-x-3">
                    <button onClick={() => setEditingId(p._id)} className="text-skin hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-700 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-ink/50">
                    No products yet — add your first one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function InquiriesTab() {
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

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-2xl text-ink">Inquiries</h2>
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

      {status === "loading" && <p className="text-ink/60">Loading inquiries…</p>}
      {status === "error" && <p className="text-ink/60">Couldn't load inquiries.</p>}
      {status === "ready" && inquiries.length === 0 && (
        <p className="text-ink/60">No inquiries here yet.</p>
      )}

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq._id} className="border border-line rounded-2xl p-5 bg-white/70">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">
                  {inq.name} <span className="text-ink/50 font-normal">· {inq.email}</span>
                </p>
                {inq.product && (
                  <p className="font-mono text-xs uppercase tracking-wide text-seed mt-1">
                    {inq.product.name}
                  </p>
                )}
                <p className="text-ink/80 mt-2">{inq.message}</p>
                {inq.quantity && <p className="text-ink/50 text-sm mt-1">Quantity: {inq.quantity}</p>}
              </div>

              <select
                value={inq.status}
                onChange={(e) => updateInquiry(inq._id, { status: e.target.value })}
                disabled={savingId === inq._id}
                className="rounded-lg border border-line px-3 py-1.5 bg-white text-sm"
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

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("products");

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink">Admin panel</h1>
          <p className="text-ink/60 mt-1">Signed in as {user?.email}</p>
        </div>
        <button onClick={logout} className="text-sm text-ink/60 hover:text-skin">
          Log out
        </button>
      </div>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${
            tab === "products" ? "bg-skin text-cream border-skin" : "border-line text-ink/70"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setTab("inquiries")}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${
            tab === "inquiries" ? "bg-skin text-cream border-skin" : "border-line text-ink/70"
          }`}
        >
          Inquiries
        </button>
      </div>

      {tab === "products" ? <ProductsTab /> : <InquiriesTab />}
    </div>
  );
}
