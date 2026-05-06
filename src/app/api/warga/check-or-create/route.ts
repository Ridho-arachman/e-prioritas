// app/api/warga/check-or-create/route.ts (asumsi lokasi)
import { StatusNoHPWarga } from "@/app/generated/prisma";
import { encrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Helper untuk menghasilkan array prefix terenkripsi
function generateEncryptedPrefixes(phoneDigits: string): string[] {
  const MIN_LENGTH = 0;
  const prefixes: string[] = [];
  for (let i = MIN_LENGTH; i <= phoneDigits.length; i++) {
    prefixes.push(encrypt(phoneDigits.slice(0, i)));
  }
  return prefixes;
}

export async function POST(req: NextRequest) {
  try {
    const { noHp, nama, alamat } = await req.json();
    if (!noHp || !nama) {
      return NextResponse.json(
        { error: "Nomor HP dan nama wajib diisi" },
        { status: 400 },
      );
    }
    const normalized = noHp.replace(/\D/g, "");
    const encryptedNoHp = encrypt(normalized);
    let warga = await prisma.warga.findUnique({
      where: { noHp: encryptedNoHp },
    });
    let isNew = false;
    if (!warga) {
      // Buat warga baru dengan noHpPrefixes
      const encryptedPrefixes = generateEncryptedPrefixes(normalized);
      warga = await prisma.warga.create({
        data: {
          noHp: encryptedNoHp,
          nama,
          alamat: alamat || null,
          statusNoHp: StatusNoHPWarga.BELUM_TERVERIFIKASI,
          noHpPrefixes: encryptedPrefixes, // simpan prefix
        },
      });
      isNew = true;
    } else {
      // Update jika ada perubahan (tanpa ubah noHp, jadi prefix tetap)
      if (warga.nama !== nama || warga.alamat !== alamat) {
        warga = await prisma.warga.update({
          where: { id: warga.id },
          data: { nama, alamat: alamat || null },
        });
      }
    }
    return NextResponse.json({
      success: true,
      wargaId: warga.id,
      isNew,
      statusNoHp: warga.statusNoHp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal memproses warga" },
      { status: 500 },
    );
  }
}