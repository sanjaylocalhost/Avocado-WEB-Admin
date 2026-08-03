import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AvocadoMark from "./AvocadoMark";

const menuItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/admin/products", label: "Products", icon: "🌱" },
  { path: "/admin/leads", label: "Leads", icon: "👥" },
  { path: "/admin/inquiries", label: "Inquiries", icon: "📧" },
  { path: "/admin/analytics", label: "Analytics", icon: "📈" },
  { path: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => {
    // Handle dashboard path specially
    if (path === "/admin/dashboard") {
      return location.pathname === "/admin/dashboard" || location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-line h-screen sticky top-0 overflow-y-auto flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-line">
        <Link to="/" className="flex items-center gap-2">
          <AvocadoMark className="h-8 w-8" />
          <span className="font-display text-xl text-ink">Avocado CRM</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? "bg-skin text-cream"
                  : "text-ink/70 hover:bg-skin/10 hover:text-skin"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-line">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-ink/70 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}