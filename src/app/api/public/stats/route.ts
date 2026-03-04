import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Hitung total masukan warga dan total kegiatan rapat
    const [totalMasukan, totalKegiatan] = await Promise.all([
      prisma.masukanWarga.count(),
      prisma.kegiatanRapat.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalMasukan,
        totalKegiatan,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data statistik" },
      { status: 500 },
    );
  }
}
