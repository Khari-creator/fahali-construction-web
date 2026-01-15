// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * NEXT.JS 16 UPDATE: 
 * 1. Function name is changed from 'middleware' to 'proxy'.
 * 2. req.cookies is handled as an async property in the 16.x runtime.
 */
export async function proxy(req: NextRequest) {
  const cookieStore = await req.cookies;
  const session = cookieStore.get("admin_session");

  // Protect /admin routes
  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
