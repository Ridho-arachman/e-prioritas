import prisma from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token tidak ditemukan" },
      { status: 400 },
    );
  }

  try {
    // Decode token dari base64url
    const decoded = JSON.parse(Buffer.from(token, "base64url").toString());
    console.log("Decoded token:", decoded);
    const { id, exp, sig } = decoded;

    // Cek expired
    if (Date.now() > exp) {
      return NextResponse.json(
        { success: false, message: "Token sudah kedaluwarsa (24 jam)" },
        { status: 400 },
      );
    }

    // Verifikasi signature
    const payload = `${id}:${exp}`;
    const expectedSig = crypto
      .createHmac(
        "sha256",
        process.env.NEXTAUTH_SECRET || "fallback-secret-change-me",
      )
      .update(payload)
      .digest("hex");

    if (sig !== expectedSig) {
      return NextResponse.json(
        { success: false, message: "Token tidak valid" },
        { status: 400 },
      );
    }

    // Update status warga menjadi terverifikasi
    await prisma.warga.update({
      where: { id },
      data: { statusNoHp: "TERVERIFIKASI" },
    });

    return NextResponse.json({
      success: true,
      message: "Nomor HP berhasil diverifikasi. Terima kasih!",
    });
  } catch (error) {
    console.error("[Verify] Error:", error);
    return NextResponse.json(
      { success: false, message: "Token tidak valid" },
      { status: 400 },
    );
  }
}
