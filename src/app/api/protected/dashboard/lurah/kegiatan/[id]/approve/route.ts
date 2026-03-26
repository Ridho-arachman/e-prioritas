// app/api/lurah/kegiatan/[id]/approve/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role, StatusRekomendasi, StatusMasukan } from "@/app/generated/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id } = await params;

  try {
    const updated = await prisma.$transaction(async (tx) => {
      // 1. Update status kegiatan
      const kegiatan = await tx.kegiatanRapat.update({
        where: { id },
        data: {
          statusRekomendasi: StatusRekomendasi.DISETUJUI,
          diprosesOlehId: session.user.id,
        },
      });

      // 2. Ambil semua masukan terkait dari junction table
      const relasiMasukan = await tx.kegiatanRapatMasukan.findMany({
        where: { kegiatanRapatId: id },
        select: { masukanId: true },
      });
      const masukanIds = relasiMasukan.map((r) => r.masukanId);

      // 3. Update status masukan yang masih DIPROSES menjadi DISELESAIKAN
      if (masukanIds.length > 0) {
        await tx.masukanWarga.updateMany({
          where: {
            id: { in: masukanIds },
            status: StatusMasukan.DIPROSES,
          },
          data: { status: StatusMasukan.DISELESAIKAN },
        });
      }

      return kegiatan;
    });

    return NextResponse.json({
      success: true,
      message: "Rekomendasi disetujui",
      data: updated,
    });
  } catch (error) {
    console.error("Error approving rekomendasi:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyetujui" },
      { status: 500 },
    );
  }
}
