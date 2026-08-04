import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  const { admin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Just render the layout - AdminRoute already handles the auth check
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-flesh-light/20">
      <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex pt-14 min-h-screen">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-line/50 shadow-lg min-h-[calc(100vh-120px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}