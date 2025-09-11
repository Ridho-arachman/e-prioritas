import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const ACCESS_SECRET = new TextEncoder().encode(process.env.ACCESS_SECRET!);
const REFRESH_SECRET = new TextEncoder().encode(process.env.REFRESH_SECRET!);

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jose.jwtVerify(accessToken, ACCESS_SECRET);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user", JSON.stringify(payload));

    return NextResponse.next({ request: { headers: requestHeaders } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Kalau expired → cek refreshToken
    if (err.code === "ERR_JWT_EXPIRED" && refreshToken) {
      try {
        const { payload } = await jose.jwtVerify(refreshToken, REFRESH_SECRET);

        // bikin accessToken baru
        const newAccessToken = await new jose.SignJWT({
          id: payload.id,
          email: payload.email,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("15m")
          .sign(ACCESS_SECRET);

        const res = NextResponse.next();

        // simpan accessToken baru ke cookie
        res.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
        });

        return res;
      } catch (refreshErr) {
        console.error("refresh token invalid", refreshErr);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

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
