import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.ACCESS_SECRET || "fallback-access-secret"
);
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.REFRESH_SECRET || "fallback-refresh-secret"
);

function getRedirectUrlByRole(role: string | undefined, reqUrl: string): URL {
  if (role === "admin") return new URL("/admin", reqUrl);

  if (role === "perangkat") return new URL("/perangkat", reqUrl);

  return new URL("/", reqUrl);
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const LOGIN_URL = new URL("/login", req.url);
  const HOME_URL = new URL("/", req.url);

  // 1. Logika untuk Halaman Login
  if (pathname === "/login") {
    if (accessToken) {
      try {
        const { payload } = await jose.jwtVerify(accessToken, ACCESS_SECRET);
        // Redirect ke dashboard yang sesuai dengan role jika token valid
        return NextResponse.redirect(
          getRedirectUrlByRole(payload.role as string, req.url)
        );
      } catch (e) {
        // Token tidak valid/expired, biarkan mereka di /login
        return NextResponse.next();
      }
    }
    return NextResponse.next(); // Lanjutkan ke halaman login
  }

  // 2. Jika tidak ada Access Token sama sekali
  if (!accessToken) {
    // Jika path-nya bukan login, redirect ke login
    LOGIN_URL.searchParams.set("from", pathname);
    return NextResponse.redirect(LOGIN_URL);
  }

  // --- Verifikasi Token & Otorisasi ---
  try {
    const { payload } = await jose.jwtVerify(accessToken, ACCESS_SECRET);
    const role = payload.role as string;

    // Cek Otorisasi (Apakah user boleh di path ini?)
    // Jika user admin mencoba mengakses path /perangkat, TOLAK
    if (pathname.startsWith("/perangkat") && role !== "perangkat") {
      return NextResponse.redirect(getRedirectUrlByRole(role, req.url));
    }

    // Jika user perangkat mencoba mengakses path /admin, TOLAK
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(getRedirectUrlByRole(role, req.url));
    }

    // Jika role sudah benar, atau path-nya public, lanjutkan
    return NextResponse.next();
  } catch (err: any) {
    // --- Penanganan Token Expired dan Refresh ---
    if (err.code === "ERR_JWT_EXPIRED" && refreshToken) {
      try {
        const { payload: refreshPayload } = await jose.jwtVerify(
          refreshToken,
          REFRESH_SECRET
        );

        // Pastikan role diambil dari refresh token
        const userRole = refreshPayload.role as string;

        // Buat Access Token baru
        const newAccessToken = await new jose.SignJWT({
          id: refreshPayload.id,
          email: refreshPayload.email,
          role: userRole,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("15m")
          .sign(ACCESS_SECRET);

        // Setelah refresh, redirect ke URL yang sesuai dengan role
        // (Ini lebih aman daripada redirect ke req.url, terutama jika req.url adalah halaman terlarang)
        const redirectUrl = getRedirectUrlByRole(userRole, req.url);
        const res = NextResponse.redirect(redirectUrl);

        // Simpan accessToken baru ke cookie
        res.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        return res;
      } catch (refreshErr) {
        // Refresh token tidak valid atau expired, harus login ulang
        console.error("Refresh Token Invalid atau Expired:", refreshErr);
        return NextResponse.redirect(LOGIN_URL);
      }
    }

    // Token invalid (selain expired) atau tidak ada Refresh Token
    console.error("Access Token Invalid:", err);
    return NextResponse.redirect(LOGIN_URL);
  }
}

// export const config = {
//   // Jalankan middleware di semua tempat kecuali aset statis dan folder internal Next.js
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// try {
//   const { payload } = await jose.jwtVerify(accessToken, ACCESS_SECRET);

//   const requestHeaders = new Headers(req.headers);
//   requestHeaders.set("x-user", JSON.stringify(payload));

//   return NextResponse.next({ request: { headers: requestHeaders } });
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// } catch (err: any) {
//   // Kalau expired → cek refreshToken
//   if (err.code === "ERR_JWT_EXPIRED" && refreshToken) {
//     try {
//       const { payload } = await jose.jwtVerify(refreshToken, REFRESH_SECRET);

//       // bikin accessToken baru
//       const newAccessToken = await new jose.SignJWT({
//         id: payload.id,
//         email: payload.email,
//       })
//         .setProtectedHeader({ alg: "HS256" })
//         .setIssuedAt()
//         .setExpirationTime("15m")
//         .sign(ACCESS_SECRET);

//       const res = NextResponse.next();

//       // simpan accessToken baru ke cookie
//       res.cookies.set("accessToken", newAccessToken, {
//         httpOnly: true,
//         sameSite: "strict",
//         path: "/",
//       });

//       return res;
//     } catch (refreshErr) {
//       console.error("refresh token invalid", refreshErr);
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.redirect(new URL("/login", req.url));
// }
// }

export const config = {
  matcher: ["/admin/:path*", "/perangkat/:path*"],
};
