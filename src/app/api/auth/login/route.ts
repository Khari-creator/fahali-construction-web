import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }

  const cookieStore = await cookies();

  cookieStore.set("admin_session", "true", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ success: true });
}
