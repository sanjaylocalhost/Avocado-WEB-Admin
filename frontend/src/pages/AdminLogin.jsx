import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AvocadoMark from "../components/AvocadoMark";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email, password);
      if (user.role !== "admin") {
        setError("This account does not have admin access.");
        return;
      }
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not log in. Check your details.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <AvocadoMark size={48} className="mx-auto mb-3" />
        <h1 className="font-display text-3xl text-ink">Admin login</h1>
        <p className="text-ink/60 mt-2">For farm staff managing products and inquiries.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white/60 border border-line rounded-2xl p-6">
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:outline-none"
          />
        </div>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 rounded-full bg-seed text-cream font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Log in to admin panel"}
        </button>
      </form>
    </div>
  );
}
