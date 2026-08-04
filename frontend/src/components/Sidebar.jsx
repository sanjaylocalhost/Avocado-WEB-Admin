

// // components/Sidebar.jsx
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { 
//   FaTachometerAlt, 
//   FaLeaf, 
//   FaEnvelope, 
//   FaUsers, 
//   FaShoppingBag, 
//   FaCog,
//   FaChartLine,
//   FaSignOutAlt,
//   FaUserPlus,
//   FaTags,
//   FaCalendarAlt,
//   FaClipboardList,
//   FaPhoneAlt,
//   FaBullhorn
// } from "react-icons/fa";

// export default function Sidebar({ isOpen, toggleSidebar }) {
//   const { admin, logout } = useAuth();
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   const menuItems = [
//     { path: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
//     { path: "/admin/products", label: "Products", icon: FaLeaf },
//     { path: "/admin/leads", label: "Leads", icon: FaUsers },
//     { path: "/admin/inquiries", label: "Inquiries", icon: FaEnvelope },
//     { path: "/admin/orders", label: "Orders", icon: FaShoppingBag },
//     { path: "/admin/analytics", label: "Analytics", icon: FaChartLine },
//     { path: "/admin/settings", label: "Settings", icon: FaCog },
//   ];

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar - Full height with flex column */}
//       <aside className={`
//         fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white z-50
//         transform transition-transform duration-300 ease-in-out
//         lg:translate-x-0 lg:static lg:z-auto
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//         flex flex-col
//       `}>
//         {/* Header - Logo */}
//         <div className="p-4 border-b border-white/10 flex-shrink-0">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
//               <span className="text-2xl">🌿</span>
//             </div>
//             <div>
//               <h1 className="font-bold text-lg text-white">Meenakshi</h1>
//               <p className="text-xs text-white/50">Admin Panel</p>
//             </div>
//           </div>
//         </div>

//         {/* Admin Info */}
//         <div className="px-3 py-2 border-b border-white/10 flex-shrink-0">
//           <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
//             <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
//               <span className="text-sm font-bold text-white">
//                 {admin?.name?.[0] || admin?.email?.[0] || "A"}
//               </span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-white truncate">
//                 {admin?.name || "Admin"}
//               </p>
//               <p className="text-xs text-white/50 truncate">
//                 {admin?.email || "admin@meenakshi.com"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation - Scrollable middle section */}
//         <nav className="flex-1 overflow-y-auto p-3 space-y-1">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const active = isActive(item.path);
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => toggleSidebar && toggleSidebar()}
//                 className={`
//                   flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
//                   ${active 
//                     ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
//                     : 'text-white/60 hover:bg-white/10 hover:text-white'
//                   }
//                 `}
//               >
//                 <Icon className={`text-lg ${active ? 'text-white' : 'text-white/60'}`} />
//                 <span className="font-medium text-sm">{item.label}</span>
//                 {active && (
//                   <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer - Logout at bottom */}
//         <div className="p-3 border-t border-white/10 flex-shrink-0">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors"
//           >
//             <FaSignOutAlt className="text-lg" />
//             <span className="font-medium text-sm">Logout</span>
//           </button>
//           <div className="mt-2 px-3">
//             <p className="text-xs text-white/30">
//               © 2026 Meenakshi Plantation
//             </p>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }




import { NavLink } from "react-router-dom";
import { memo } from "react";

const Sidebar = memo(function Sidebar({ isOpen, toggleSidebar }) {
  const navItems = [
    { path: "/admin/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/admin/products", icon: "🛒", label: "Products" },
    { path: "/admin/inquiries", icon: "📩", label: "Inquiries" },
    { path: "/admin/leads", icon: "👥", label: "Leads" },
    { path: "/admin/analytics", icon: "📈", label: "Analytics" },
    { path: "/admin/settings", icon: "⚙️", label: "Settings" },
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
      <aside
        className={`fixed lg:sticky top-14 left-0 h-[calc(100vh-56px)] w-64 bg-slate-800 border-r border-white/10 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) toggleSidebar();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
});

export default Sidebar;