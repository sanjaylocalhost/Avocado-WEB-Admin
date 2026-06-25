import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const statusStyles = {
  pending: "bg-flesh-light/60 text-seed",
  contacted: "bg-skin/15 text-skin-dark",
  resolved: "bg-line/60 text-ink/60",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .get("/inquiries/mine")
      .then((res) => {
        setInquiries(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-3xl text-ink">Hi {user?.name?.split(" ")[0]}</h1>
      <p className="text-ink/60 mt-2">Here's everything you've sent us so far.</p>

      <div className="flex gap-3 mt-6">
        <Link
          to="/products"
          className="px-5 py-2.5 rounded-full bg-skin text-cream text-sm font-medium hover:bg-skin-dark transition-colors"
        >
          Browse products
        </Link>
        <Link
          to="/contact"
          className="px-5 py-2.5 rounded-full border border-skin text-skin text-sm font-medium hover:bg-skin hover:text-cream transition-colors"
        >
          Send a new message
        </Link>
      </div>

      <div className="mt-10">
        {status === "loading" && <p className="text-ink/60">Loading your inquiries…</p>}
        {status === "error" && <p className="text-ink/60">Couldn't load your inquiries right now.</p>}
        {status === "ready" && inquiries.length === 0 && (
          <p className="text-ink/60">You haven't sent any inquiries yet.</p>
        )}

        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq._id} className="border border-line rounded-2xl p-5 bg-white/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {inq.product && (
                    <p className="font-mono text-xs uppercase tracking-wide text-seed">
                      {inq.product.name}
                    </p>
                  )}
                  <p className="text-ink/80 mt-1">{inq.message}</p>
                  {inq.quantity && (
                    <p className="text-ink/50 text-sm mt-1">Quantity: {inq.quantity}</p>
                  )}
                </div>
                <span
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[inq.status]}`}
                >
                  {inq.status}
                </span>
              </div>
              <p className="text-ink/40 text-xs mt-3">
                Sent {new Date(inq.createdAt).toLocaleDateString()}
              </p>
              {inq.adminNote && (
                <p className="text-ink/70 text-sm mt-2 border-t border-line pt-2">
                  <span className="font-medium">Reply: </span>
                  {inq.adminNote}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
