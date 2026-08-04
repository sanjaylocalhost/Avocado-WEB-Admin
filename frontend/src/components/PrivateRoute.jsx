import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-skin border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-ink/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}