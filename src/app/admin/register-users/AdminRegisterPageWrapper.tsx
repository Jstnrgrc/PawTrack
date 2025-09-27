'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

interface JwtPayload {
  id: number;
  email: string;
  role: 'admin' | 'staff' | 'client';
}

export default function AdminRegisterPageWrapper({ children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('token');

      // If first admin is being created, allow access
      const res = await fetch('/api/check-first-admin');
      const data = await res.json();
      if (data.firstAdmin === true) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      // Otherwise, require JWT
      if (!token) return router.push('/login');

      try {
        const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === 'admin') setAuthorized(true);
        else router.push('/login');
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!authorized) return <p>Access denied</p>;

  return <>{children}</>;
}
