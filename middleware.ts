// middleware.ts (di root project)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Ambil token dari cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // 2. Jika user mencoba mengakses route yang diproteksi tanpa token
  if (!accessToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    // Redirect ke halaman login
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Jika user sudah login dan mencoba mengakses halaman login/register
  if (
    accessToken &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Lanjutkan request jika user memiliki token atau mengakses halaman publik
  return NextResponse.next();
}

// Konfigurasi matcher untuk menentukan route mana yang akan dieksekusi oleh middleware
export const config = {
  matcher: [
    "/dashboard/:path*", // Melindungi semua sub-route dari /dashboard
    "/login", // Menerapkan logic jika user sudah login
    "/register",
  ],
};
