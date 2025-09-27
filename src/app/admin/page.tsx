"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  PawPrint,
  FileText,
  MapPin,
} from "lucide-react";

type UserData = {
  email: string;
  role: string;
  first_name: string;
  middle_name: string;
  last_name: string;
};
//--------------------------------------FRONTEND FUNCTION----------------------------------------------------//

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const userData: UserData = JSON.parse(atob(token.split(".")[1]));

      if (userData.role === "admin") {
        setUser(userData); // ✅ allow admin
      } else {
        router.push("/client"); // ✅ redirect clients (and others)
      }
    } catch (err) {
      console.error("Invalid token", err);
      router.push("/login");
    }
  }, [router]);

    //create a full name variable
    const fullName = `${user?.first_name ?? ""} ${user?.middle_name ?? ""} ${user?.last_name ?? ""}`.trim();

//--------------------------------------DISPLAY CONTENT----------------------------------------------------//


  return (
     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Welcome, {fullName}</h1>
        <p className="text-gray-600 mb-6">You are logged in as <strong>Admin</strong>.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Users"
            count={128}
            link="/admin/users"
            icon={<Users size={32} className="text-blue-600" />}
          />
          <DashboardCard
            title="Pets"
            count={342}
            link="/admin/pets"
            icon={<PawPrint size={32} className="text-green-600" />}
          />
          <DashboardCard
            title="Records"
            count={876}
            link="/admin/records"
            icon={<FileText size={32} className="text-purple-600" />}
          />
        </div>
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  count: number;
  link: string;
  icon: React.ReactNode;
};

function DashboardCard({ title, count, link, icon }: DashboardCardProps) {
  return (
    <a
      href={link}
      className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition transform hover:scale-[1.02] flex items-center space-x-4"
    >
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold mt-1">{count}</p>
        <p className="text-sm text-blue-600 mt-1">View Details →</p>
      </div>
    </a>
  );
}


