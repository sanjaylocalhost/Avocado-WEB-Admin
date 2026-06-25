import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AvocadoMark from "../components/AvocadoMark";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not create your account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <AvocadoMark size={48} className="mx-auto mb-3" />
        <h1 className="font-display text-3xl text-ink">Create your account</h1>
        <p className="text-ink/60 mt-2">Send inquiries and keep track of every conversation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white/60 border border-line rounded-2xl p-6">
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Full name</label>
          <input
            type="text"
            value={form.name}
            onChange={update("name")}
            required
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            required
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Phone (optional)</label>
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Location (optional)</label>
          <input
            type="text"
            value={form.location}
            onChange={update("location")}
            placeholder="City, state"
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={update("password")}
            required
            minLength={6}
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:outline-none"
          />
        </div>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark transition-colors disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-center text-ink/60 mt-6 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-skin font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
