import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { memo } from "react";

const AdminNavbar = memo(function AdminNavbar({ toggleSidebar }) {
  const { admin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login?admin=true";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800 border-b border-white/10">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="text-white font-semibold hidden sm:block">Meenakshi Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-white/60 hidden md:inline">
            {admin?.email || "Admin"}
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 font-medium text-sm">
              {admin?.name?.[0] || admin?.email?.[0] || "A"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded-lg hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
});

export default AdminNavbar;