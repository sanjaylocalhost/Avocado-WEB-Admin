// pages/AdminProducts.jsx
import { useEffect, useState, useRef } from "react";
import api, { uploadImage, getImageUrl, getPlaceholderImage } from "../services/api";

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initial.image || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      e.target.value = "";
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image (JPG, PNG, GIF, or WebP)");
      e.target.value = "";
      return;
    }

    setImageFile(file);
    setUploadingImage(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setUploadingImage(false);
    } catch (error) {
      console.error("Error processing image:", error);
      setUploadingImage(false);
      alert("Failed to process image");
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm({ ...form, image: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      let imageUrl = form.image || "";

      if (imageFile) {
        const uploadResult = await uploadImage(imageFile);
        imageUrl = uploadResult.imageUrl;
      }

      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock || 0),
        image: imageUrl,
        features: form.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      };

      await onSave(productData);
    } catch (err) {
      setError(err.response?.data?.message || "Could not save product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-line p-6 mb-6">
      <h3 className="font-display text-xl text-ink mb-4">
        {initial._id ? "Edit Product" : "Add New Product"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-ink/70 mb-2">Product Image</label>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-50 flex-shrink-0 relative">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = getPlaceholderImage();
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </>
              ) : (
                <span className="text-gray-400 text-sm text-center px-2">No image</span>
              )}
            </div>

            <div className="flex-1">
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className={`inline-block px-4 py-2 text-white rounded-lg cursor-pointer transition-colors ${
                  uploadingImage ? "bg-gray-400 cursor-not-allowed" : "bg-skin hover:bg-skin-dark"
                }`}
              >
                {uploadingImage ? "Processing..." : imagePreview ? "Change Image" : "Choose Image"}
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Max size: 5MB • JPG, PNG, GIF, WebP
              </p>
              {form.image && !imageFile && imagePreview && (
                <p className="text-xs text-green-600 mt-1">✓ Current image saved</p>
              )}
              {imageFile && (
                <p className="text-xs text-blue-600 mt-1">✓ New image selected: {imageFile.name}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Product Name *</label>
          <input 
            value={form.name} 
            onChange={update("name")} 
            required 
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:ring-2 focus:ring-skin focus:border-transparent"
            placeholder="e.g., Hass Avocado Seed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Category *</label>
          <select 
            value={form.category} 
            onChange={update("category")} 
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:ring-2 focus:ring-skin focus:border-transparent"
          >
            <option value="seed">Seed</option>
            <option value="plant">Plant</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-ink/70 mb-1">Description *</label>
          <textarea 
            value={form.description} 
            onChange={update("description")} 
            required 
            rows={3} 
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:ring-2 focus:ring-skin focus:border-transparent"
            placeholder="Describe your product in detail..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-ink/70 mb-1">Features (comma separated)</label>
          <input 
            value={form.features} 
            onChange={update("features")} 
            placeholder="High germination rate, Disease resistant, Bulk available" 
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:ring-2 focus:ring-skin focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Price (₹) *</label>
          <input 
            type="number" 
            min="0" 
            step="0.01"
            value={form.price} 
            onChange={update("price")} 
            required 
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:ring-2 focus:ring-skin focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Unit Label</label>
          <input 
            value={form.unit} 
            onChange={update("unit")} 
            placeholder="per seed / per plant" 
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:ring-2 focus:ring-skin focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Stock Quantity</label>
          <input 
            type="number" 
            min="0" 
            value={form.stock} 
            onChange={update("stock")} 
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:ring-2 focus:ring-skin focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div className="hidden">
          <input value={form.image} onChange={update("image")} />
        </div>

        {error && (
          <div className="md:col-span-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="md:col-span-2 flex gap-3 pt-2">
          <button 
            type="submit" 
            disabled={saving || uploadingImage} 
            className="px-6 py-2.5 rounded-full bg-skin text-cream text-sm font-medium hover:bg-skin-dark transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : initial._id ? "Update Product" : "Add Product"}
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="px-6 py-2.5 rounded-full border border-line text-ink/70 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-line overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-48 bg-gray-100">
        {product.image ? (
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = getPlaceholderImage();
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>No image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(product)}
            className="p-1.5 bg-white rounded-lg shadow-md hover:bg-skin hover:text-white transition-colors"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="p-1.5 bg-white rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-colors"
            title="Delete"
          >
            🗑️
          </button>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            product.category === "seed" 
              ? "bg-green-100 text-green-700" 
              : "bg-blue-100 text-blue-700"
          }`}>
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-ink text-lg line-clamp-1">{product.name}</h3>
        <p className="text-ink/60 text-sm mt-1 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-line">
          <div>
            <p className="text-lg font-bold text-skin">₹{product.price}</p>
            <p className="text-xs text-ink/50">{product.unit}</p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </p>
          </div>
        </div>
        
        {product.features && product.features.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-ink/60">
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs text-ink/40">+{product.features.length - 2} more</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [editingId, setEditingId] = useState(null);
  const [actionError, setActionError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

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

  const editingProduct = editingId && editingId !== "new" 
    ? products.find((p) => p._id === editingId) 
    : null;

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const totalProducts = products.length;
  const inStock = products.filter(p => p.stock > 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-ink">Product Management</h1>
          <p className="text-ink/60 mt-1">Manage your avocado products inventory</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-line">
          <p className="text-ink/50 text-sm">Total Products</p>
          <p className="text-2xl font-bold text-ink">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-line">
          <p className="text-ink/50 text-sm">In Stock</p>
          <p className="text-2xl font-bold text-green-600">{inStock}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-line">
          <p className="text-ink/50 text-sm">Low Stock (≤10)</p>
          <p className="text-2xl font-bold text-yellow-600">{lowStock}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-line">
          <p className="text-ink/50 text-sm">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
        </div>
      </div>

      {/* Add Product Button */}
      {editingId === null && (
        <button
          onClick={() => setEditingId("new")}
          className="mb-6 px-6 py-3 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark transition-colors flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add New Product
        </button>
      )}

      {/* Product Form */}
      {editingId === "new" && (
        <ProductForm
          initial={emptyProduct}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      )}

      {editingProduct && (
        <ProductForm
          initial={{
            ...editingProduct,
            features: (editingProduct.features || []).join(", "),
          }}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-lg border border-line px-4 py-2 bg-white focus:ring-2 focus:ring-skin focus:border-transparent"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-line px-4 py-2 bg-white focus:ring-2 focus:ring-skin focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="seed">Seeds</option>
          <option value="plant">Plants</option>
        </select>
      </div>

      {/* Error Message */}
      {actionError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{actionError}</p>
        </div>
      )}

      {/* Product Grid */}
      {status === "loading" && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-skin border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-ink/60">Loading products...</p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center py-12">
          <p className="text-ink/60">Couldn't load products. Please try again.</p>
        </div>
      )}

      {status === "ready" && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-line">
              <p className="text-2xl mb-2">🌱</p>
              <p className="text-ink/60">No products found</p>
              <p className="text-sm text-ink/40 mt-1">
                {searchTerm || categoryFilter !== "all" 
                  ? "Try adjusting your search or filter" 
                  : "Add your first product using the button above"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onEdit={(p) => setEditingId(p._id)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}