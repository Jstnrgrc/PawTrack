import { NextResponse } from 'next/server';
import User from '@/models/User.js';
import Addresses from '@/models/Addresses.js';
import { hashPassword, verifyToken } from '@/lib/auth.js';

export async function POST(req) {
  try {
    const {
      first_name, middle_name, last_name, email, password,
      street, barangay, city, zip_code
    } = await req.json();

    if (!first_name || !last_name || !email || !password || !street) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingAdmins = await User.count({ where: { role: 'admin' } });

    if (existingAdmins === 0) {
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        first_name, middle_name, last_name, email,
        password: hashedPassword, role: 'admin'
      });
      return NextResponse.json({ message: 'First admin created', user: { id: user.id, email: user.email } }, { status: 201 });
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden: Admins only' }, { status: 403 });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return NextResponse.json({ message: 'Email already used' }, { status: 400 });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      first_name, middle_name, last_name, email,
      password: hashedPassword, role: 'client'
    });

    await Addresses.create({
      user_id: user.id,
      street,
      barangay: barangay || null,
      city: city || null,
      zip_code: zip_code || null
    });

    return NextResponse.json({ message: 'Client created successfully', user: { id: user.id, email: user.email } }, { status: 201 });

  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}