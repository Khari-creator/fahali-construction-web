import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "admin_session",
      value: "true",
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { error: "Invalid login credentials" },
    { status: 401 }
  );
}
