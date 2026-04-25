import { encrypt } from "@/lib/encryption";
import { handleResponse } from "@/lib/handleResponse";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ nomorHp: string }> },
) {
  const { nomorHp } = await params;
  if (!nomorHp) {
    return handleResponse({
      success: false,
      message: "Nomor HP diperlukan",
      status: 400,
    });
  }

  try {
    // Normalisasi nomor HP (hapus karakter non-digit)
    const clean = nomorHp.replace(/\D/g, "");
    const encryptedNoHp = encrypt(clean);

    // Cari warga berdasarkan nomor HP terenkripsi
    const warga = await prisma.warga.findUnique({
      where: { noHp: encryptedNoHp },
      select: {
        id: true,
        nama: true,
        statusNoHp: true,
        masukan: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            judul: true,
            deskripsi: true,
            status: true,
            alasanPenolakan: true,
            createdAt: true,
            domainIsu: { select: { nama: true } },
          },
        },
      },
    });

    if (!warga) {
      return handleResponse({
        success: false,
        message: "Data dengan nomor HP tersebut tidak ditemukan.",
        status: 404,
      });
    }

    // Return data warga beserta daftar masukan
    return handleResponse({
      success: true,
      data: {
        warga: {
          nama: warga.nama,
          statusNoHp: warga.statusNoHp,
        },
        masukanList: warga.masukan.map((m) => ({
          id: m.id,
          judul: m.judul,
          deskripsi: m.deskripsi,
          status: m.status,
          alasanPenolakan: m.alasanPenolakan,
          tanggal: m.createdAt.toISOString(),
          domainIsu: m.domainIsu?.nama,
        })),
      },
    });
  } catch (error) {
    console.error(error);
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
}
