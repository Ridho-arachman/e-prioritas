import { decrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { wargaId } = await req.json();
    if (!wargaId) {
      return NextResponse.json(
        { error: "wargaId diperlukan" },
        { status: 400 },
      );
    }

    const warga = await prisma.warga.findUnique({
      where: { id: wargaId },
      select: { id: true, noHp: true, statusNoHp: true },
    });
    if (!warga) {
      return NextResponse.json(
        { error: "Warga tidak ditemukan" },
        { status: 404 },
      );
    }
    if (warga.statusNoHp === "TERVERIFIKASI") {
      return NextResponse.json(
        { error: "Sudah terverifikasi" },
        { status: 400 },
      );
    }

    const decryptedNoHp = decrypt(warga.noHp);
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const payload = `${warga.id}:${expiresAt}`;
    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-change-me";
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");
    const token = Buffer.from(
      JSON.stringify({ id: warga.id, exp: expiresAt, sig: signature }),
    ).toString("base64url");

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || req.headers.get("origin");
    const verifyUrl = `${baseUrl}/verify?token=${token}`;

    const message = `Halo Kak, ini dari tim administrasi.\n\nKlik link berikut untuk verifikasi nomor WhatsApp Anda:\n${verifyUrl}\n\n⚠️ Link berlaku 24 jam.\nTerima kasih 🙏`;

    const phone = decryptedNoHp.replace(/\D/g, "").replace(/^0/, "62");
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({ waLink, verifyUrl });
  } catch (error) {
    console.error("send-verification error:", error);
    return NextResponse.json(
      { error: "Gagal membuat link verifikasi" },
      { status: 500 },
    );
  }
}
