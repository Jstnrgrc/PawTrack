'use client';

import { useEffect, useState } from 'react';

type UserItem = {
  id: number;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  role: string;
  is_active: boolean;
};

export default function ManageUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to load users');
        setUsers([]);
      } else {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error(err);
      setError('Network or server error');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  // Placeholder for view action
  const handleView = (user: UserItem) => {
    console.log('View user', user);
    // TODO: open modal or navigate to user detail page
  };

  // Placeholder for edit action
  const handleEdit = (user: UserItem) => {
    console.log('Edit user', user);
    // TODO: open modal or navigate to edit page
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        <button
          onClick={fetchUsers}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {loading && <div className="p-4 bg-white rounded shadow">Loading users…</div>}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4">{error}</div>
      )}

      {!loading && !error && (
        <div className="overflow-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Active</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{u.id}</td>
                  <td className="px-4 py-3">{`${u.first_name} ${u.middle_name ? u.middle_name + ' ' : ''}${u.last_name}`}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">{u.is_active ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleView(u)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(u)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="p-4 text-gray-500">No users found.</div>
          )}
        </div>
      )}
    </div>
  );
}
