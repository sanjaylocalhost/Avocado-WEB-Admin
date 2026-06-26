import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Contact() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submitInquiry(e) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await api.post("/inquiries", { message });
      setSent(true);
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not send your message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="font-display text-4xl text-ink">Get in touch</h1>
        <p className="text-ink/70 mt-4">
          Questions about seeds, plants, bulk orders, or farming guidance — we're happy to
          help.
        </p>

        <dl className="mt-8 space-y-4 text-ink/80">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-seed">Location</dt>
            <dd>Meenakshi Plantation, Karnataka, India</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-seed">Phone</dt>
            <dd>+91 98453 11238</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-seed">Email</dt>
            <dd>admin@Meenakshi Plantation.com</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-seed">WhatsApp</dt>
            <dd>+91 98453 11238</dd>
          </div>
        </dl>
      </div>

      <div className="bg-white/60 border border-line rounded-2xl p-6">
        <h2 className="font-display text-xl text-ink mb-4">Send us a message</h2>

        {!user && (
          <p className="text-ink/70">
            <Link to="/login" state={{ from: { pathname: "/contact" } }} className="text-skin font-medium hover:underline">
              Log in
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="text-skin font-medium hover:underline">
              create an account
            </Link>{" "}
            to send us a message — this lets us reply to the right place and you can track
            your inquiries from your account.
          </p>
        )}

        {user && sent && (
          <p className="text-skin-dark font-medium">
            Thanks for reaching out — we'll be in touch soon.
          </p>
        )}

        {user && !sent && (
          <form onSubmit={submitInquiry} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                placeholder="Tell us what you need help with…"
                className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="px-6 py-3 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark transition-colors disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
