import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET is not defined. Check your .env file and restart the server.');
}

// comparing and hashing passwords
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}
//Generate JWT token with local storage
export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, first_name: user.first_name, middle_name: user.middle_name, last_name: user.last_name },
    SECRET_KEY,
    { expiresIn: '1d' }
  );
}

// check token if valid from the request header
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}