import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const adminCount = await User.count({ where: { role: 'admin' } });
    return NextResponse.json({ firstAdmin: adminCount === 0 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
