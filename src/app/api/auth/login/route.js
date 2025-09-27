import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth.js';

export async function POST(req) {

    //extract email and password
  try {
    const { email, password } = await req.json();

    //validating input
    if (!email || !password)
      return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });

    //connect to db
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'pawtrack'
    });

    //Finding the user by email
    const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);

    await conn.end();

    //check if users exist
    const user = rows[0];
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    //verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
   
    //generate token
    const token = generateToken(user);

    //if succesful
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role, first_name: user.first_name, middle_name: user.middle_name, last_name: user.last_name },
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}