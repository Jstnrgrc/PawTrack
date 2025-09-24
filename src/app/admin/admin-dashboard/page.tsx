"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(atob(token.split(".")[1]));

      if (userData.role === "admin") {
        setUser(userData); // ✅ allow admin
      } else {
        router.push("/client/dashboard"); // ✅ redirect clients (and others)
      }
    } catch (err) {
      console.error("Invalid token", err);
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {user && <p className="mt-2">Welcome, {user.email}</p>}
    </div>
  );
}
