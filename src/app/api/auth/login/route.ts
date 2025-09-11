import { extractErrors } from "@/lib/extractErrors";
import { comparePassword } from "@/lib/hashing";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwtHelper";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schema/login";

import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    //parse body
    const body = await req.json();

    // validation
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: extractErrors(parsed) },
        { status: 400 }
      );
    }

    // get data
    const { email, password } = parsed.data;

    // find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 401 }
      );

    // compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json(
        {
          success: false,
          message: "Password Atau Email Yang Anda Masukkan Salah",
        },
        { status: 401 }
      );

    // generate token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const response = NextResponse.json({
      success: true,
      message: "Login Berhasil",
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // otomatis true di prod
      sameSite: "strict",
      path: "/", // penting biar bisa diakses seluruh route
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // otomatis true di prod
      sameSite: "strict",
      path: "/", // penting biar bisa diakses seluruh route
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
