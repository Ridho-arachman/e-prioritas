import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { generateAccessToken, JwtUser } from "@/lib/jwtHelper";
import { handleResponse } from "@/lib/responseHandler";

const REFRESH_SECRET = new TextEncoder().encode(
  process.env.REFRESH_SECRET || "fallback-refresh-secret"
);

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    console.log("Ssss");

    if (!refreshToken) {
      return handleResponse({
        success: false,
        message: "User belum login",
        status: 401,
      });
    }

    // ✅ Verifikasi refresh token
    const { payload } = await jose.jwtVerify(refreshToken, REFRESH_SECRET);
    if (!payload || typeof payload !== "object") {
      return handleResponse({
        success: false,
        message: "User tidak mempunyai akses",
        status: 403,
      });
    }

    const user = payload as JwtUser;

    // ✅ Buat accessToken baru
    const accessToken = await generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // ✅ Buat response
    const response = handleResponse({
      success: true,
      message: "Token berhasil di-refresh",
      data: {
        accessToken: accessToken,
      },
      status: 200,
    });

    // ✅ Simpan accessToken baru di cookie
    response.cookies.set("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (err: any) {
    if (err instanceof jose.errors.JWTExpired) {
      return handleResponse({
        success: false,
        message: "Refresh token kadaluwarsa.",
        status: 403,
      });
    }

    if (err instanceof jose.errors.JWTInvalid) {
      return handleResponse({
        success: false,
        message: "Refresh token tidak valid.",
        status: 403,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi kesalahan pada server.",
      status: 500,
    });
  }
}
