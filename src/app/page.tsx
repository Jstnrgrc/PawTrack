'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 text-gray-800">
      {/* 🐾 Header Section */}
      <div className="text-center max-w-2xl p-6">
        <h1 className="text-5xl font-extrabold text-blue-800 drop-shadow-sm">
          🐾 Welcome to PawTrack
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your trusted <span className="font-semibold text-orange-600">digital veterinary system</span> 
          — where your pet’s health records are secure, accessible, and easy to manage.
        </p>
      </div>

      {/* 🎨 Illustration Placeholder (can replace with image later) */}
      <div className="mt-10">
        <div className="w-64 h-64 bg-gradient-to-tr from-blue-200 to-orange-200 rounded-full shadow-lg flex items-center justify-center">
          <span className="text-7xl">🐶</span>
        </div>
      </div>

      {/* 🔘 Action Button */}
      <div className="mt-10">
        <button
          onClick={() => router.push('/login')}
          className="px-8 py-3 bg-blue-700 text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-800 hover:scale-105 transform transition"
        >
          Login to PawTrack
        </button>
      </div>

      {/* 📜 Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-500">
        © 2025 PawTrack Veterinary Records
      </footer>
    </main>
  );
}
