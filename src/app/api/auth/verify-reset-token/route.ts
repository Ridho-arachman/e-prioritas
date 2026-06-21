import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  console.log("Verifying token:", token); // Debug log
  if (!token) {
    return NextResponse.json({ valid: false });
  }

  const verification = await prisma.verification.findFirst({
    where: { identifier: `reset-password:${token}` },
  });

  if (!verification || verification.expiresAt < new Date()) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({ valid: true });
}
