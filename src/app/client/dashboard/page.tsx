"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(atob(token.split(".")[1])); // decode JWT payload

      if (userData.role === "admin") {
        // 🚫 redirect admins away from client dashboard
        router.push("/admin/admin-dashboard");
      } else if (userData.role === "client") {
        setUser(userData); // ✅ client stays here
      } else {
        router.push("/login"); // invalid role → logout
      }
    } catch (err) {
      console.error("Invalid token", err);
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Client Dashboard</h1>
      {user && <p className="mt-2">Welcome, {user.email}</p>}
    </div>
  );
}
