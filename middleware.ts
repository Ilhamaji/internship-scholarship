import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export function middleware(request: NextRequest) {
  // 1. Get the refresh token directly from the request's cookies
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 2. If there's no token, redirect to the login page
  if (!refreshToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. If the token exists, allow the request to proceed
  return NextResponse.next();
}
