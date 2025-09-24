'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterClientPage() {
  const router = useRouter();

  // 🧠 State for form inputs
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
    street: '',
    barangay: '',
    city: '',
    zip_code: '',
  });

  // ⚠️ State for error messages
  const [error, setError] = useState('');

  // ⏳ State for loading spinner
  const [loading, setLoading] = useState(false);

  // 📥 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // 🚀 Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      alert('🐾 Client registered successfully!');
      router.push('/'); // ✅ Redirect after registration
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4">
      {/* 🧾 Registration Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        
        {/* 🐾 Logo and Title */}
        <div className="text-center mb-6">
          <div className="text-4xl font-extrabold text-blue-600">🐾 PawTrack</div>
          <p className="text-sm text-gray-500 mt-2">Register a New Client</p>
        </div>

        {/* 🧠 Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 📛 Name Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="middle_name"
              placeholder="Middle"
              value={form.middle_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 📧 Email Input */}
          <input
            name="email"
            type="email"
            placeholder="you@clinic.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* 🔒 Password Input */}
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* 🏠 Address Inputs */}
          <input
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              name="barangay"
              placeholder="Barangay"
              value={form.barangay}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="zip_code"
              placeholder="ZIP"
              value={form.zip_code}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* ⚠️ Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* 🔘 Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Client'}
          </button>
        </form>

        {/* 🐾 Footer */}
        <div className="text-xs text-center text-gray-400 mt-6">
          © 2025 PawTrack Veterinary System
        </div>
      </div>
    </div>
  );
}
