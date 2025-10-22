import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.ACCESS_SECRET || "fallback-access-secret"
);

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jose.jwtVerify(accessToken, ACCESS_SECRET);
    return NextResponse.next();
  } catch (err) {
    console.warn("Access token verification error:", err);

    if (err instanceof jose.errors.JWTExpired) {
      const response = NextResponse.next();
      response.headers.set("X-Refresh-Needed", "true");
      return response;
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/perangkat/:path*"],
};
