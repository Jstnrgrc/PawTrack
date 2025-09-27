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
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Toggle sidebar on mobile
  const [dropdownOpen, setDropdownOpen] = useState(false); // Profile dropdown
  const [usersOpen, setUsersOpen] = useState(false); // Users submenu
  const [petsOpen, setPetsOpen] = useState(false); // Pets submenu
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-blue-700 text-white flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} 
        md:translate-x-0 md:w-64`}
      >
        {/* Logo + close button for mobile */}
        <div className="flex items-center justify-between p-4 border-b border-blue-600">
          <span className="font-bold text-lg">Admin Panel</span>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-2 space-y-2">
          {/* Dashboard */}
          <Link
            href="/admin"
            className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded transition-colors"
          >
            <LayoutDashboard size={20} />
            <span className="md:block">Dashboard</span>
          </Link>

{/* Users submenu */}
          <button
            onClick={() => setUsersOpen(!usersOpen)}
            className="flex items-center justify-between w-full hover:bg-blue-600 p-2 rounded transition-colors"
          >
            <span className="flex items-center space-x-2">
              <Users size={20} />
              <span>Users</span>
            </span>
            {usersOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {usersOpen && (
            <div className="ml-4 flex flex-col space-y-1">
              <Link
                href="/admin/manage-users"
                className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
              >
                Manage Users
              </Link>
              <Link
                href="/admin/register-users"
                className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
              >
                Register User
              </Link>
            </div>
          )}
{/* Pets submenu */}
          <button
            onClick={() => setPetsOpen(!petsOpen)}
            className="flex items-center justify-between w-full hover:bg-blue-600 p-2 rounded transition-colors"
          >
            <span className="flex items-center space-x-2">
              <PawPrint size={20} />
              <span>Pets</span>
            </span>
            {petsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {petsOpen && (
            <div className="ml-4 flex flex-col space-y-1">
              <Link
                href="/admin/manage-pets"
                className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
              >
                Manage Pets
              </Link>
              <Link
                href="/admin/register-pets"
                className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
              >
                Register Pet
              </Link>
            </div>
          )}

          {/* Settings */}
          <Link
            href="/admin/settings"
            className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded transition-colors"
          >
            <Settings size={20} />
            <span className="md:block">Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* Hamburger button on mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden bg-gray-200 p-2 rounded"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-xl font-bold text-blue-700">Admin Dashboard</h1>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-gray-100 p-2 rounded hover:bg-gray-200"
            >
              {/* ✅ You can replace this with a profile image */}
              <span className="font-medium">Admin</span>
            </button>

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
