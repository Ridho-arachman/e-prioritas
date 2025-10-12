import { generateAccessToken, generateRefreshToken } from "@/lib/jwtHelper";
import { NextRequest, NextResponse } from "next/server";
import { extractErrors } from "@/lib/extractErrors";
import { comparePassword } from "@/lib/hashing";
import { loginSchema } from "@/schema/login";
import { prisma } from "@/lib/prisma";
import { cors } from "@/lib/cors";

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const headers = cors(req, {
      allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
    });
    if (headers instanceof NextResponse) return headers;

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: extractErrors(parsed) },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 401 }
      );

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json(
        {
          success: false,
          message: "Password Atau Email Yang Anda Masukkan Salah",
        },
        { status: 401 }
      );

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const response = NextResponse.json(
      {
        success: true,
        message: "Login Berhasil",
      },
      { status: 200, headers }
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
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
    return NextResponse.json(
      { success: false, message: "Terjadi Error Pada Server" },
      { status: 500 }
    );
  }
};

export { POST };
