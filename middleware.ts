import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;
  const path = request.nextUrl.pathname;

  // 1. Jika tidak ada token dan user mencoba akses dashboard atau admin
  if (
    !accessToken &&
    (path.startsWith("/dashboard") || path.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Redirect user yang sudah login agar tidak bisa akses login/register
  if (
    accessToken &&
    (path.startsWith("/login") || path.startsWith("/register"))
  ) {
    const redirectPath = role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // 3. Role-based access control
  if (accessToken && role) {
    if (role === "student" && path.startsWith("/admin")) {
      // Student tidak boleh akses /admin/*
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (role === "admin" && path.startsWith("/dashboard")) {
      // Admin tidak boleh akses /dashboard/*
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // 4. Lanjutkan request jika semua validasi lolos
  return NextResponse.next();
}

// Tentukan route yang dipantau middleware
export const config = {
  matcher: [
    "/dashboard/:path*", // Untuk student
    "/admin/:path*", // Untuk admin
    "/login", // Untuk redirect user yang sudah login
    "/register", //
  ],
};
