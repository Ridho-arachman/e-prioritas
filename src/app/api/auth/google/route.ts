import { auth } from "@/lib/auth";
import { handleBetterAuthError } from "@/lib/handleBetterAuthError";
import { checkRateLimit } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const captchaToken = req.nextUrl.searchParams.get("captcha");
  const key = `api:ip:${ip}`;

  if (!captchaToken) {
    return NextResponse.redirect(
      new URL("/login?error=Captcha+belum+diverifikasi", req.nextUrl.origin),
    );
  }

  const limit = await checkRateLimit(key, 30, 60 * 1000);
  if (!limit.success) {
    return NextResponse.redirect(
      new URL("/login?error=Terlalu+banyak+percobaan", req.nextUrl.origin),
    );
  }

  try {
    const callbackURL = new URL(
      "/login?google=success",
      req.nextUrl.origin,
    ).toString();
    const result = await auth.api.signInSocial({
      headers: { "x-captcha-response": captchaToken },
      body: {
        provider: "google",
        callbackURL: callbackURL,
        errorCallbackURL: `${req.nextUrl.origin}/login?error=signup_disabled`,
      },
    });

    console.log("signInSocial result:", JSON.stringify(result, null, 2));

    if (result.redirect === true && result.url) {
      return NextResponse.redirect(result.url);
    } else {
      // Jika tidak ada URL redirect, kemungkinan user sudah terautentikasi?
      // Atau ada kasus lain, redirect ke login dengan pesan
      return NextResponse.redirect(
        new URL("/login?error=signup_disabled", req.nextUrl.origin),
      );
    }
  } catch (error: any) {
    console.error("Error in signInSocial:", error);

    // Tangani error dari Better Auth
    const betterAuthErr = handleBetterAuthError(error);
    let errorMsg = "Terjadi error pada server";
    if (betterAuthErr) {
      errorMsg = betterAuthErr.message;
    } else if (error?.message) {
      errorMsg = error.message;
    }

    // Jika error mengatakan bahwa user tidak ditemukan, beri pesan spesifik
    if (
      errorMsg.toLowerCase().includes("user not found") ||
      errorMsg.toLowerCase().includes("account not found")
    ) {
      errorMsg =
        "Email tidak terdaftar. Silakan hubungi admin untuk pendaftaran.";
    }

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(errorMsg)}`,
        req.nextUrl.origin,
      ),
    );
  }
};
