// app/api/protected/warga/verification-link/route.ts
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { decrypt } from "@/lib/encryption";
import { handleResponse } from "@/lib/handleResponse";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const allowedRoles: Role[] = ["ADMIN"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session)
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
    });

  if (!allowedRoles.includes(session.user.role as Role))
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });

  try {
    const { wargaId } = await request.json();
    if (!wargaId)
      return NextResponse.json(
        { error: "ID warga diperlukan" },
        { status: 400 },
      );

    const warga = await prisma.warga.findUnique({
      where: { id: wargaId },
      select: { id: true, noHp: true, statusNoHp: true },
    });

    if (!warga)
      return NextResponse.json(
        { error: "Warga tidak ditemukan" },
        { status: 404 },
      );

    if (warga.statusNoHp === "TERVERIFIKASI")
      return NextResponse.json(
        { error: "Nomor sudah terverifikasi" },
        { status: 400 },
      );

    // ✅ Dekripsi nomor HP
    let decryptedNoHp = "";
    try {
      decryptedNoHp = decrypt(warga.noHp);
    } catch (err) {
      console.error("Gagal dekripsi nomor HP:", err);
      return NextResponse.json(
        { error: "Data nomor HP rusak" },
        { status: 500 },
      );
    }

    // Generate token (valid 24 jam)
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const payload = `${wargaId}:${expiresAt}`;
    const signature = crypto
      .createHmac(
        "sha256",
        process.env.NEXTAUTH_SECRET || "fallback-secret-change-me",
      )
      .update(payload)
      .digest("hex");
    const token = Buffer.from(
      JSON.stringify({ id: wargaId, exp: expiresAt, sig: signature }),
    ).toString("base64url");

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin");
    const verifyUrl = `${baseUrl}/verify?token=${token}`;

    // Pesan verifikasi
    const message = `Halo Kak, ini dari tim administrasi.\n\nKlik link berikut untuk verifikasi nomor WhatsApp Anda:\n${verifyUrl}\n\n⚠️ Link berlaku 24 jam.\nTerima kasih 🙏`;

    // ✅ Format nomor untuk Fonnte (628xxxxxxxxxx)
    const phone = decryptedNoHp.replace(/\D/g, "").replace(/^0/, "62");

    // ✅ Kirim pesan melalui Fonnte
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

    // Opsional: kembalikan verifyUrl untuk referensi admin
    return NextResponse.json({
      success: true,
      message: "Pesan verifikasi telah dikirim via WhatsApp",
      verifyUrl, // masih disertakan jika perlu
    });
  } catch (error) {
    console.error("[VerificationLink] Error:", error);
    return NextResponse.json({ error: "Gagal membuat link" }, { status: 500 });
  }
}
