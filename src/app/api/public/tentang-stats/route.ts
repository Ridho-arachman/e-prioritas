// app/api/public/tentang-stats/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma";

export async function GET() {
  try {
    // 1. Total masukan warga
    const totalMasukan = await prisma.masukanWarga.count();

    // 2. Masukan per domain (kategori)
    const masukanPerDomainRaw = await prisma.masukanWarga.groupBy({
      by: ["domainIsuId"],
      _count: true,
    });

    // Ambil nama domain untuk setiap ID
    const domainIds = masukanPerDomainRaw.map((item) => item.domainIsuId);
    const domains = await prisma.domainIsu.findMany({
      where: { id: { in: domainIds } },
      select: { id: true, nama: true },
    });

    const masukanPerDomain = masukanPerDomainRaw.map((item) => {
      const domain = domains.find((d) => d.id === item.domainIsuId);
      return {
        domain: domain?.nama || "Lainnya",
        count: item._count,
      };
    });

    // 3. Prioritas utama (ambil dari kegiatan rapat terbaru yang memiliki rekomendasiItems)
    const latestKegiatan = await prisma.kegiatanRapat.findFirst({
      where: {
        rekomendasiItems: { not: Prisma.DbNull }, // ✅ Perbaikan: gunakan DbNull
        statusRekomendasi: { in: ["DIAJUKAN", "DISETUJUI"] },
      },
      orderBy: { createdAt: "desc" },
      select: { rekomendasiItems: true },
    });

    let prioritas: string[] = [];
    if (latestKegiatan && latestKegiatan.rekomendasiItems) {
      try {
        const parsed = latestKegiatan.rekomendasiItems as any;
        if (parsed.prioritas && Array.isArray(parsed.prioritas)) {
          prioritas = parsed.prioritas.slice(0, 5).map((p: any) => p.deskripsi);
        }
      } catch (e) {
        console.error("Gagal parsing rekomendasiItems:", e);
      }
    }

    // Data kelurahan statis (jika tidak ada di database, bisa hardcode)
    const dataKelurahan = {
      totalPenduduk: 10333,
      totalKepalaKeluarga: 3011,
      luasKelurahan: 272.45, // dalam Ha
      jumlahLembagaPendidikan: 21,
    };

    return NextResponse.json({
      success: true,
      data: {
        totalMasukan,
        masukanPerDomain,
        prioritas,
        kelurahan: dataKelurahan,
      },
    });
  } catch (error) {
    console.error("Error fetching tentang stats:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}
