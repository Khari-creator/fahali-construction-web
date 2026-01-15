import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate email
    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Validate password hash
    const isValidPassword = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH!
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create signed session token
    const sessionToken = crypto
      .createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
      .update(`${email}:${Date.now()}`)
      .digest("hex");

    /**
     * NEXT.JS 16 FIX:
     * cookies() is now an asynchronous function. 
     * You must await it before calling .set()
     */
    const cookieStore = await cookies();

    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
