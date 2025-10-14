import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.ACCESS_SECRET || "fallback-access-secret"
);

function getRedirectUrlByRole(role: string | undefined, baseUrl: string): URL {
  switch (role) {
    case "ADMIN":
      return new URL("/admin", baseUrl);
    case "PERANGKAT_DESA":
      return new URL("/perangkat", baseUrl);
    default:
      return new URL("/", baseUrl);
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const LOGIN_URL = new URL("/login", req.url);

  // 1️⃣ Halaman login → jika sudah punya token valid, redirect ke dashboard
  if (pathname === "/login") {
    if (accessToken) {
      try {
        const { payload } = await jose.jwtVerify(accessToken, ACCESS_SECRET);
        return NextResponse.redirect(
          getRedirectUrlByRole(payload.role as string, req.url)
        );
      } catch {
        return NextResponse.next(); // biarkan ke halaman login
      }
    }
    return NextResponse.next();
  }

  // 2️⃣ Jika tidak ada access token → redirect ke login
  if (!accessToken) {
    LOGIN_URL.searchParams.set("from", pathname);
    return NextResponse.redirect(LOGIN_URL);
  }

  // 3️⃣ Verifikasi token
  try {
    const { payload } = await jose.jwtVerify(accessToken, ACCESS_SECRET);
    const role = payload.role as string;

    // Cek izin akses berdasarkan role
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(getRedirectUrlByRole(role, req.url));
    }
    if (pathname.startsWith("/perangkat") && role !== "PERANGKAT_DESA") {
      return NextResponse.redirect(getRedirectUrlByRole(role, req.url));
    }

    // Token valid & izin sesuai
    return NextResponse.next();
  } catch (err: any) {
    // 4️⃣ Kalau token expired dan masih ada refresh token → arahkan ke API refresh
    if (err.code === "ERR_JWT_EXPIRED" && refreshToken) {
      const redirectToRefresh = new URL("/api/auth/refresh", req.url);
      redirectToRefresh.searchParams.set("redirect", pathname); // bisa arahkan balik setelah refresh
      return NextResponse.redirect(redirectToRefresh);
    }

    console.error("❌ Token invalid:", err);
    return NextResponse.redirect(LOGIN_URL);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/perangkat/:path*"],
};
