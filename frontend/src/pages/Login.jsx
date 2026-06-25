import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AvocadoMark from "../components/AvocadoMark";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      const redirectTo = location.state?.from?.pathname || (user.role === "admin" ? "/admin" : "/dashboard");
      navigate(redirectTo, { replace: true });
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
        <h1 className="font-display text-3xl text-ink">Welcome back</h1>
        <p className="text-ink/60 mt-2">Log in to send inquiries and track your requests.</p>
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
          className="w-full px-6 py-3 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark transition-colors disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="text-center text-ink/60 mt-6 text-sm">
        New here?{" "}
        <Link to="/signup" className="text-skin font-medium hover:underline">
          Create an account
        </Link>
      </p>
      <p className="text-center text-ink/40 mt-2 text-xs">
        Farm staff:{" "}
        <Link to="/admin/login" className="hover:underline">
          admin login
        </Link>
      </p>
    </div>
  );
}
