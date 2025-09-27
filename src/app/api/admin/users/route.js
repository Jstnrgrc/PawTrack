// app/api/admin/users/route.js
import { NextResponse } from "next/server"; // ✅ Next.js helper to send JSON responses from API routes
import jwt from "jsonwebtoken"; // ✅ Library for creating/verifying JWT tokens

// Secret key used to verify JWTs
// In production, store it in .env for security
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/* -------------------------------
   Helper Functions for Responses
-------------------------------- */

// Returns a 401 Unauthorized response (if no/invalid token)
function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

// Returns a 403 Forbidden response (if user is not admin)
function forbidden() {
  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
}

/* -------------------------------
   Middleware-like Helper
   - Verifies token
   - Ensures role === "admin"
-------------------------------- */
async function requireAdmin(req) {
  // Grab the Authorization header: "Bearer <token>"
  const auth = req.headers.get("authorization") || "";

  // Extract only the token part
  const token = auth.split(" ")[1];

  // If no token found, return Unauthorized
  if (!token) return { ok: false, res: unauthorized() };

  try {
    // Verify token using our secret
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the token’s role is NOT admin → block them
    if (decoded.role !== "admin") return { ok: false, res: forbidden() };

    // ✅ Token is valid and user is admin
    return { ok: true, decoded };
  } catch (err) {
    // If token invalid/expired → Unauthorized
    return { ok: false, res: unauthorized() };
  }
}

/* -------------------------------
   GET /api/admin/users
   - Requires admin
   - Fetches all users from DB
-------------------------------- */
export async function GET(req) {
  try {
    // Step 1: Ensure the request is from an admin
    const check = await requireAdmin(req);
    if (!check.ok) return check.res; // If not admin, return error

    // Step 2: Import the User model dynamically
    // "@" points to src/ (thanks to jsconfig/tsconfig alias)
    const { default: User } = await import("@/models/User.js");

    // Step 3: Query all users, EXCLUDING passwords (for security)
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]], // Order newest users first
    });

    // Step 4: Return users as JSON response
    return NextResponse.json({ users });
  } catch (err) {
    // If something goes wrong in DB or code, log and return 500
    console.error("GET /api/admin/users error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
