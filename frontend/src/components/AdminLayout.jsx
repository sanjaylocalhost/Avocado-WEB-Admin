// components/AdminLayout.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not admin, redirect or show message
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream/30">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center border border-line">
          <span className="text-6xl block mb-4">🔒</span>
          <h2 className="text-2xl font-display text-ink mb-2">Access Denied</h2>
          <p className="text-ink/60 mb-4">
            You don't have permission to access this page.
          </p>
          <a href="/" className="text-skin hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30">
      {/* Top Bar */}
      <header className="bg-white border-b border-line lg:ml-72">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-cream transition-colors"
          >
            <svg className="w-6 h-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-ink/60 hidden sm:inline">
              {user?.email}
            </span>
            <div className="w-8 h-8 rounded-full bg-skin/20 flex items-center justify-center">
              <span className="text-skin font-medium text-sm">
                {user?.name?.[0] || user?.email?.[0] || "A"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex lg:gap-6">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}