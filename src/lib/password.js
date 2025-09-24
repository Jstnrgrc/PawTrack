// src/lib/password.js
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

(async () => {
  const hashed = await bcrypt.hash('admin@123', SALT_ROUNDS);
  console.log(hashed);
})();
