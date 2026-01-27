import { config } from "@/config";
import { auth } from "@/lib/auth";
import { handleBetterAuthError } from "@/lib/handleBetterAuthError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { EmailSchema } from "@/schema/authSchema";
import { headers } from "next/headers";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const parsed = EmailSchema.safeParse(body);
    if (!parsed.success) return handleZodValidation(parsed);

    const { email } = parsed.data;

    const response = await auth.api.sendVerificationEmail({
      body: { email, callbackURL: `http://localhost:3000/verify-success` },
    });

    return handleResponse({
      success: true,
      message: "Verifikasi Email Berhasil Dikirim",
      status: 200,
      data: response.status,
    });
  } catch (error) {
    console.log(error);

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
