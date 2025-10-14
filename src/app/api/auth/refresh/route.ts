import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generateAccessToken, JwtUser } from "@/lib/jwtHelper";

const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await req.cookies;
    const refreshToken = await cookieStore.get("refreshToken")?.value;

    console.log(refreshToken);

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "User belum login" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    if (!decoded || typeof decoded === "string") {
      return NextResponse.json(
        { succes: false, message: "User tidak mempunyai akses" },
        { status: 403 }
      );
    }

    const user = decoded as JwtUser;

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      { success: true, message: "Token berhasil di refresh", accessToken },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      // Token ada, tetapi tidak valid (kadaluwarsa, signature salah)
      return NextResponse.json(
        {
          success: false,
          message: "Refresh token tidak valid atau kadaluwarsa.",
        },
        { status: 403 } // 403 Forbidden: Klien mengirim token yang tidak berhak
      );
    }
    return NextResponse.json(
      { success: false, message: "Terjadi Error Pada Server" },
      { status: 500 }
    );
  }
}
