import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generateAccessToken, JwtUser } from "@/lib/jwtHelper";

const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // pastikan hasilnya sesuai tipe
    if (!decoded || typeof decoded === "string") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const user = decoded as JwtUser;

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({ accessToken }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}
