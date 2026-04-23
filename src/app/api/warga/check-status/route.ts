import { encrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { noHp } = await req.json();
    if (!noHp) {
      return NextResponse.json(
        { error: "Nomor HP diperlukan" },
        { status: 400 },
      );
    }

    const normalized = noHp.replace(/\D/g, "");
    const encryptedNoHp = encrypt(normalized);
    const warga = await prisma.warga.findUnique({
      where: { noHp: encryptedNoHp },
      select: { id: true, nama: true, alamat: true, statusNoHp: true },
    });

    if (!warga) {
      return NextResponse.json({
        exists: false,
        statusNoHp: null,
      });
    }

    return NextResponse.json({
      exists: true,
      wargaId: warga.id,
      nama: warga.nama,
      alamat: warga.alamat,
      statusNoHp: warga.statusNoHp,
    });
  } catch (error) {
    console.error("check-status error:", error);
    return NextResponse.json(
      { error: "Gagal mengecek status" },
      { status: 500 },
    );
  }
}
