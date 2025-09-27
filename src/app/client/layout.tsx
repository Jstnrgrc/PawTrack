"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  PawPrint,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ Sidebar toggle for mobile
  const [dropdownOpen, setDropdownOpen] = useState(false); // ✅ Profile dropdown toggle
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-blue-700 text-white flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} 
        md:translate-x-0 md:w-64`} // ✅ Always visible on md+ screens, toggleable on mobile
      >
        {/* Logo + Close button for mobile */}
        <div className="flex items-center justify-between p-4 border-b border-blue-600">
          <span className="font-bold">Menu</span>
          {/* ✅ Hide button on desktop */}
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-2 space-y-2">
          <Link
            href="/admin/pages"
            className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded"
          >
            <LayoutDashboard size={20} />
            <span className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
              Dashboard
            </span>
          </Link>

          <Link
            href="/client/myprofile"
            className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded"
          >
            <Users size={20} />
            <span className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
              My Profile
            </span>
          </Link>

          <Link
            href="/client/pets"
            className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded"
          >
            <PawPrint size={20} />
            <span className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
              Pet Records
            </span>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded"
          >
            <Settings size={20} />
            <span className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
              Settings
            </span>
          </Link>
        </nav>
      </aside>

      {/* ✅ Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* ✅ Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* ✅ Hamburger button only on mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden bg-gray-200 p-2 rounded"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-xl font-bold text-blue-700">Dashboard</h1>

          {/* ✅ Profile dropdown on right */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-gray-100 p-2 rounded hover:bg-gray-200"
            >
              {/* ✅ Profile image placeholder */}
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-700">U</span>
              </div>
              <span className="font-medium">User</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
