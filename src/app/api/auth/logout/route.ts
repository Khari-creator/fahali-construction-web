import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // NEXT.JS 16 FIX: Await the cookies() function before calling methods
  const cookieStore = await cookies();

  // Now .delete() is available on the resolved cookieStore
  cookieStore.delete("admin_session");

  return NextResponse.json({ success: true });
}
