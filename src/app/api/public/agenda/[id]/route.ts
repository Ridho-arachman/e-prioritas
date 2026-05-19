import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const agenda = await prisma.kegiatanRapat.findUniqueOrThrow({
      where: { id },
      include: {
        domainIsu: {
          select: { nama: true, deskripsi: true },
        },
        dibuatOleh: {
          select: { name: true },
        },
        masukanRelasi: {
          include: {
            masukan: {
              include: {
                warga: { select: { nama: true } },
              },
            },
          },
        },
        dataMasterRelasi: {
          include: {
            dataMaster: {
              select: { namaAtribut: true, kritikalitas: true, jumlah: true },
            },
          },
        },
      },
    });

    const formattedMasukan = agenda.masukanRelasi.map((rel) => ({
      id: rel.masukan.id,
      judul: rel.masukan.judul,
      deskripsi: rel.masukan.deskripsi,
      lokasi: rel.masukan.lokasi,
      status: rel.masukan.status,
      namaPengirim: rel.masukan.warga?.nama || "Tidak diketahui",
      createdAt: rel.masukan.createdAt,
    }));

    const formattedAgenda = {
      id: agenda.id,
      judul: agenda.judul,
      deskripsi: agenda.deskripsi,
      tanggal: agenda.tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      lokasi: agenda.lokasi,
      domainIsu: agenda.domainIsu,
      // ❌ hapus mode: agenda.mode,
      judulLaporan: agenda.judulLaporan,
      rekomendasiItems: agenda.rekomendasiItems,
      statusRekomendasi: agenda.statusRekomendasi,
      dibuatOleh: agenda.dibuatOleh?.name,
      masukan: formattedMasukan,
      dataMaster: agenda.dataMasterRelasi.map((rel) => rel.dataMaster),
    };

    return handleResponse({ success: true, data: formattedAgenda });
  } catch (error) {
    const prismaResponse = handlePrismaError(error);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
}
