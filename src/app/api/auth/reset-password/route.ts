import { auth } from "@/lib/auth";
import { handleBetterAuthError } from "@/lib/handleBetterAuthError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { PasswordResetSchema } from "@/schema/authSchema";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const token = req.nextUrl.searchParams.get("token");
    const turnstileToken = await req.headers.get("x-captcha-response");

    if (!turnstileToken) {
      return handleResponse({
        success: false,
        message: "Captcha belum diverifikasi",
        status: 400,
      });
    }

    if (!token) {
      return handleResponse({
        success: false,
        message: "Token reset password tidak ditemukan",
        status: 400,
      });
    }

    const body = await req.json();

    const parsed = PasswordResetSchema.safeParse(body);
    if (!parsed.success) return handleZodValidation(parsed);

    const newPassword = parsed.data.password;

    const res = await auth.api.resetPassword({
      headers: {
        "x-captcha-response": turnstileToken,
      },
      body: {
        token,
        newPassword,
      },
    });
    return handleResponse({
      success: true,
      message: "Password berhasil direset",
      data: res,
      status: 200,
    });
  } catch (error) {
    // Better Auth Handler
    const betterAuthErr = handleBetterAuthError(error);
    if (betterAuthErr) {
      return handleResponse({
        success: false,
        message: betterAuthErr.message,
        status: betterAuthErr.status,
      });
    }

    // Error Internal Server
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};
