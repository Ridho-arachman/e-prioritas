import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleResponse } from "@/lib/responseHandler";
import * as jose from "jose";

const VERIFY_SECRET = new TextEncoder().encode(
  process.env.VERIFY_SECRET || "fallback-refresh-secret"
);

export async function GET(
  req: Request,
  ctx: RouteContext<"/api/auth/verify/[token]">
) {
  try {
    const { token } = await ctx.params;

    if (!token) {
      handleResponse({
        success: false,
        message: "Token tidak ditemukan.",
        status: 400,
      });
    }

    const { payload } = await jose.jwtVerify(token, VERIFY_SECRET);

    if (
      !payload ||
      typeof payload !== "object" ||
      typeof payload.id !== "string"
    ) {
      return handleResponse({
        success: false,
        message: "Token tidak valid.",
        status: 400,
      });
    }

    // Update user jadi verified
    await prisma.user.update({
      where: { id: payload.id },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });

    // // Redirect ke halaman sukses (opsional)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/verified-email-success?success=true`
    );
  } catch (error) {
    console.error("VERIFY ERROR DETAIL:", error);
    if (error instanceof jose.errors.JWTExpired) {
      return handleResponse({
        success: false,
        message: "Token verifikasi sudah kedaluwarsa.",
        status: 400,
      });
    }

    if (error instanceof jose.errors.JWTInvalid) {
      return handleResponse({
        success: false,
        message: "Token verifikasi tidak valid.",
        status: 400,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi kesalahan server.",
      status: 500,
    });
  }
}
