import { config } from "@/config";
import { auth } from "@/lib/auth";
import { handleBetterAuthError } from "@/lib/handleBetterAuthError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { checkRateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/schema/login";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const key = `api:ip:${ip}`;

  const limit = await checkRateLimit(key, 30, 60 * 1000); // 30 request per menit
  if (!limit.success) {
    return handleResponse({
      success: false,
      message: "Terlalu banyak percobaan, coba lagi nanti",
      status: 429,
      headers: {
        "Retry-After": String(limit.retryAfter),
      },
    });
  }
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
        callbackURL: `${config.appUrl}/verify-success`,
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
