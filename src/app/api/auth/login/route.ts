import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return NextResponse.json({ error: "Invalid login credentials" }, { status: 401 });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return NextResponse.json({ error: "Invalid login credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    // Store a secure cookie with admin id. In production this should be a signed session id.
    const isProd = process.env.NODE_ENV === "production";
    response.cookies.set({
      name: "admin_session",
      value: admin.id,
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
