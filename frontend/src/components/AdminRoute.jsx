import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { memo } from "react";

const AdminRoute = memo(function AdminRoute({ children }) {
  const { admin, loading } = useAuth();

  console.log("🔒 AdminRoute - Admin:", admin?.email);
  console.log("🔒 AdminRoute - Loading:", loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white/60">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    console.log("🔒 No admin found, redirecting to login");
    return <Navigate to="/login?admin=true" replace />;
  }

  console.log("🔒 Admin found, rendering children");
  return children;
});

export default AdminRoute;