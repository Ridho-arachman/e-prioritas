// app/api/dashboard/perangkat/route.ts
import { Role, StatusRekomendasi } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const allowedRoles: Role[] = ["PERANGKAT_DESA"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 403,
    });
  }

  if (!allowedRoles.includes(session.user.role as Role)) {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  const userId = session.user.id;

  try {
    // 1. Total data master (global)
    const totalDataMaster = await prisma.dataMaster.count();

    // 2. Data master aktif (global)
    const activeDataMaster = await prisma.dataMaster.count({
      where: { isActive: true },
    });

    // 3. 5 data master terbaru (global)
    const recentDataMaster = await prisma.dataMaster.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        namaAtribut: true,
        kritikalitas: true,
        isActive: true,
        createdAt: true,
        domainIsu: {
          select: { nama: true },
        },
      },
    });

    // 4. Kegiatan rapat DRAFT milik user
    const totalKegiatanDraft = await prisma.kegiatanRapat.count({
      where: {
        statusRekomendasi: "DRAFT",
      },
    });

    // 5. Kegiatan rapat DIAJUKAN milik user
    const totalKegiatanDiajukan = await prisma.kegiatanRapat.count({
      where: {
        statusRekomendasi: "DIAJUKAN",
      },
    });

    // 6. Masukan yang diverifikasi oleh user
    const totalMasukan = await prisma.masukanWarga.count();

    // 7. Ringkasan kritikalitas (global)
    const kritikalitasCount = await prisma.dataMaster.groupBy({
      by: ["kritikalitas"],
      _count: true,
    });

    // 8. Ringkasan status masukan (global) – menampilkan semua 5 status
    const masukanPerStatus = await prisma.masukanWarga.groupBy({
      by: ["status"],
      _count: true,
    });

    return NextResponse.json({
      totalDataMaster,
      activeDataMaster,
      recentDataMaster,
      totalKegiatanDraft,
      totalKegiatanDiajukan,
      totalMasukan,
      kritikalitasCount,
      masukanPerStatus,
    });
  } catch (err) {
    const prismaResponse = handlePrismaError(err);
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
