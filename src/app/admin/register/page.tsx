'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterClientPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
    street: '',
    barangay: '',
    city: '',
    zip_code: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      alert('Client registered successfully!');
      router.push('/'); // Redirect after registration
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-2">
      <input
        name="first_name"
        placeholder="First Name"
        value={form.first_name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="middle_name"
        placeholder="Middle Name"
        value={form.middle_name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="last_name"
        placeholder="Last Name"
        value={form.last_name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="street"
        placeholder="Street"
        value={form.street}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="barangay"
        placeholder="Barangay"
        value={form.barangay}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="zip_code"
        placeholder="Zip Code"
        value={form.zip_code}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Registering...' : 'Register Client'}
      </button>
    </form>
  );
}
