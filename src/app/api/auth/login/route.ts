import { generateAccessToken, generateRefreshToken } from "@/lib/jwtHelper";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/lib/hashing";
import { loginSchema } from "@/schema/login";
import { prisma } from "@/lib/prisma";
import { cors } from "@/lib/cors";
import { handleResponse } from "@/lib/responseHandler";
import { handleZodValidation } from "@/lib/handleZodValidation";

const POST = async (req: NextRequest) => {
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return handleZodValidation(parsed, headers);

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return handleResponse({
        success: false,
        message: "User tidak ditemukan",
        status: 404,
      });

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid)
      return handleResponse({
        success: false,
        message: "Password Atau Email Yang Anda Masukkan Salah",
        status: 401,
      });

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    const response = handleResponse({
      success: true,
      message: "Login Berhasil",
      status: 200,
    });

    response.cookies.set("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return handleResponse({
      success: false,
      message: "Terjadi Error Pada Server",
      status: 500,
    });
  }
};

export { POST };
