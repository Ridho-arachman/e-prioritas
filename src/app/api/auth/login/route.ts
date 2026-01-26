import { config } from "@/config";
import { auth } from "@/lib/auth";
import { handleBetterAuthError } from "@/lib/handleBetterAuthError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { loginSchema } from "@/schema/login";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const turnstileToken = await req.headers.get("x-captcha-response");
    const parsed = loginSchema.safeParse(body);

    if (!turnstileToken) {
      return handleResponse({
        success: false,
        message: "Captcha belum diverifikasi",
        status: 400,
      });
    }

    if (!parsed.success) return handleZodValidation(parsed);

    const { email, password, rememberMe } = parsed.data;

    const result = await auth.api.signInEmail({
      headers: {
        "x-captcha-response": turnstileToken,
      },
      body: {
        email,
        password,
        callbackURL: `http://localhost:3000/verify-success`,
        rememberMe,
      },
    });

    return handleResponse({
      success: true,
      message: "Login Berhasil",
      data: result,
    });
  } catch (error) {
    console.log(error);

    const betterAuthErr = handleBetterAuthError(error);
    if (betterAuthErr) {
      return handleResponse({
        success: false,
        message: betterAuthErr.message,
        status: betterAuthErr.status,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};
