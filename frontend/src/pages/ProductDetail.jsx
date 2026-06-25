import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  async function submitInquiry(e) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await api.post("/inquiries", {
        product: id,
        quantity,
        message: message || `I'm interested in ${product.name}.`,
      });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not send your inquiry. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (status === "loading") {
    return <p className="text-center py-20 text-ink/60">Loading product…</p>;
  }

  if (status === "error" || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-ink/60">We couldn't find that product.</p>
        <Link to="/products" className="text-skin font-medium hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12">
      <div className="aspect-square rounded-3xl bg-flesh-light/40 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-display text-skin/40">No image yet</span>
        )}
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-wide text-seed">
          {product.category === "seed" ? "Seed" : "Plant"}
        </span>
        <h1 className="font-display text-3xl text-ink mt-1">{product.name}</h1>
        <p className="font-mono text-lg text-skin-dark mt-2">
          ₹{product.price} <span className="text-ink/50 text-sm">{product.unit}</span>
        </p>
        <p className="text-ink/70 mt-4 leading-relaxed">{product.description}</p>

        {product.features?.length > 0 && (
          <ul className="mt-5 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="seed-bullet text-ink/80">
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 border-t border-line pt-6">
          <h2 className="font-display text-xl text-ink mb-3">Interested in this product?</h2>

          {!user && (
            <p className="text-ink/70">
              <Link to="/login" state={{ from: { pathname: `/products/${id}` } }} className="text-skin font-medium hover:underline">
                Log in
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="text-skin font-medium hover:underline">
                create an account
              </Link>{" "}
              to send an inquiry about pricing and availability.
            </p>
          )}

          {user && sent && (
            <p className="text-skin-dark font-medium">
              Thanks — your inquiry has been sent. We'll get back to you shortly.
            </p>
          )}

          {user && !sent && (
            <form onSubmit={submitInquiry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1">
                  Quantity needed (optional)
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 200 seeds, 50 plants"
                  className="w-full rounded-lg border border-line px-3 py-2 bg-white/70 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder={`I'm interested in ${product.name}.`}
                  className="w-full rounded-lg border border-line px-3 py-2 bg-white/70 focus:outline-none"
                />
              </div>
              {error && <p className="text-sm text-red-700">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-3 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark transition-colors disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
