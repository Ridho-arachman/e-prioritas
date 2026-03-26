// app/api/lurah/dashboard/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role, StatusRekomendasi, StatusMasukan } from "@/app/generated/prisma";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }
  const allowedRoles: Role[] = ["LURAH", "ADMIN"];
  if (!allowedRoles.includes(session.user.role as Role)) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 },
    );
  }

  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const where: any = {};
  if (startDate) where.createdAt = { gte: new Date(startDate) };
  if (endDate) where.createdAt = { ...where.createdAt, lte: new Date(endDate) };

  try {
    const [
      totalMasukan,
      masukanMenunggu,
      masukanDiverifikasi,
      masukanDitolak,
      totalKegiatan,
      rekomendasiDiajukan,
      rekomendasiDisetujui,
    ] = await Promise.all([
      prisma.masukanWarga.count({ where }),
      prisma.masukanWarga.count({
        where: { ...where, status: StatusMasukan.MENUNGGU },
      }),
      prisma.masukanWarga.count({
        where: { ...where, status: StatusMasukan.DIVERIFIKASI },
      }),
      prisma.masukanWarga.count({
        where: { ...where, status: StatusMasukan.DITOLAK },
      }),
      prisma.kegiatanRapat.count({ where }),
      prisma.kegiatanRapat.count({
        where: { ...where, statusRekomendasi: StatusRekomendasi.DIAJUKAN },
      }),
      prisma.kegiatanRapat.count({
        where: { ...where, statusRekomendasi: StatusRekomendasi.DISETUJUI },
      }),
    ]);

    // Ambil semua createdAt dalam rentang untuk dikelompokkan per bulan
    const masukanData = await prisma.masukanWarga.findMany({
      where,
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Kelompokkan per bulan
    const monthlyMap = new Map<string, number>();
    masukanData.forEach((item) => {
      const monthKey = item.createdAt.toISOString().slice(0, 7); // format YYYY-MM
      monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + 1);
    });

    const monthlyMasukan = Array.from(monthlyMap.entries()).map(
      ([month, count]) => ({
        month,
        count,
      }),
    );

    return NextResponse.json({
      success: true,
      data: {
        totalMasukan,
        masukanMenunggu,
        masukanDiverifikasi,
        masukanDitolak,
        totalKegiatan,
        rekomendasiDiajukan,
        rekomendasiDisetujui,
        monthlyMasukan,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
