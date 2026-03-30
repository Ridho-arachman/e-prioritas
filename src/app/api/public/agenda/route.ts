import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Ambil 3 kegiatan rapat terdekat (tanggal >= sekarang)
    const now = new Date();
    const agendas = await prisma.kegiatanRapat.findMany({
      where: {
        tanggal: {
          gte: now,
        },
      },
      select: {
        id: true,
        judul: true,
        tanggal: true,
      },
      orderBy: {
        tanggal: "asc",
      },
      take: 3,
    });

    // Format tanggal ke format Indonesia
    const formattedAgendas = agendas.map((a) => ({
      id: a.id,
      nama: a.judul,
      tanggal: a.tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }));

    return NextResponse.json({ success: true, data: formattedAgendas });
  } catch (error) {
    console.error("Error fetching agendas:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data agenda" },
      { status: 500 },
    );
  }
}
