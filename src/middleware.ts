// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);

    // kalau butuh lempar data user ke request berikutnya → pakai request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user", JSON.stringify(decoded));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/beranda/:path*",
    "/hasil/:path*",
    "/nilai/:path*",
    "/api/protected/:path*",
    "/api/ahp/:path*",
    "/api/kriteria/:path*",
    "/api/topsis/:path*",
    "/api/hasil/:path*",
    "/api/nilai/:path*",
    "/api/alternatif/:path*",
  ],
};
