// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import AvocadoMark from "./AvocadoMark";

// const menuItems = [
//   { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
//   { path: "/admin/products", label: "Products", icon: "🌱" },
//   { path: "/admin/leads", label: "Leads", icon: "👥" },
//   { path: "/admin/inquiries", label: "Inquiries", icon: "📧" },
//   { path: "/admin/analytics", label: "Analytics", icon: "📈" },
//   { path: "/admin/settings", label: "Settings", icon: "⚙️" },
// ];

// export default function Sidebar() {
//   const location = useLocation();
//   const { logout } = useAuth();

//   const isActive = (path) => {
//     // Handle dashboard path specially
//     if (path === "/admin/dashboard") {
//       return location.pathname === "/admin/dashboard" || location.pathname === "/admin";
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <aside className="w-64 bg-white border-r border-line h-screen sticky top-0 overflow-y-auto flex flex-col flex-shrink-0">
//       {/* Logo */}
//       <div className="p-6 border-b border-line">
//         <Link to="/" className="flex items-center gap-2">
//           <AvocadoMark className="h-8 w-8" />
//           <span className="font-display text-xl text-ink">Avocado CRM</span>
//         </Link>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 space-y-1">
//         {menuItems.map((item) => {
//           const active = isActive(item.path);
          
//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                 active
//                   ? "bg-skin text-cream"
//                   : "text-ink/70 hover:bg-skin/10 hover:text-skin"
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="text-sm font-medium">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="p-4 border-t border-line">
//         <button
//           onClick={logout}
//           className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-ink/70 hover:bg-red-50 hover:text-red-600 transition-colors"
//         >
//           <span className="text-lg">🚪</span>
//           <span className="text-sm font-medium">Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

// components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/products", label: "Products", icon: "🌱" },
    { path: "/admin/inquiries", label: "Inquiries", icon: "📧" },
    { path: "/admin/leads", label: "Leads", icon: "👥" },
    { path: "/admin/orders", label: "Orders", icon: "📦" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white border-r border-line z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-line">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌿</span>
              <div>
                <h1 className="font-display text-lg text-ink">Meenakshi</h1>
                <p className="text-xs text-ink/50">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 lg:hidden text-ink/50 hover:text-ink"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive(item.path) 
                    ? 'bg-skin text-cream shadow-md' 
                    : 'text-ink/70 hover:bg-cream hover:text-ink'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {isActive(item.path) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cream/50" />
                )}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-line">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-ink/60 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <span className="text-xl">🚪</span>
              <span className="font-medium">Logout</span>
            </button>
            <div className="mt-3 px-4">
              <p className="text-xs text-ink/40">
                © 2026 Meenakshi Plantation
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}