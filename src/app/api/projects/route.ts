import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // NEXT.JS 16 FIX: Await the cookies() function
  const cookieStore = await cookies();
  
  // Now you can safely use .get()
  const session = cookieStore.get("admin_session");

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Your existing logic to fetch projects...
  return NextResponse.json({ projects: [] });
}
