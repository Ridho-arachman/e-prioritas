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

    // ✅ Dekripsi nomor HP (sebaiknya tambahkan try‑catch)
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

    // ✅ Format nomor untuk Fonnte (628xxxxxxxxxx)
    const phone = decryptedNoHp.replace(/\D/g, "").replace(/^0/, "62");

    // ✅ Kirim langsung melalui Fonnte API
    const fonnteToken = process.env.FONNTE_API_KEY;
    if (!fonnteToken) {
      console.error("FONNTE_API_KEY tidak diatur");
      return NextResponse.json(
        { error: "Konfigurasi layanan pesan belum siap" },
        { status: 500 },
      );
    }

    const fonnteResponse = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: fonnteToken,
      },
      body: JSON.stringify({
        target: phone,
        message: message,
      }),
    });

    if (!fonnteResponse.ok) {
      const errorText = await fonnteResponse.text();
      console.error("Fonnte API error:", fonnteResponse.status, errorText);
      return NextResponse.json(
        { error: "Gagal mengirim pesan WhatsApp" },
        { status: 502 },
      );
    }

    // ✅ Kembalikan verifyUrl untuk referensi admin (opsional)
    return NextResponse.json({
      success: true,
      message: "Pesan verifikasi telah dikirim via WhatsApp",
      verifyUrl,
    });
  } catch (error) {
    console.error("send-verification error:", error);
    return NextResponse.json(
      { error: "Gagal membuat atau mengirim link verifikasi" },
      { status: 500 },
    );
  }
}
