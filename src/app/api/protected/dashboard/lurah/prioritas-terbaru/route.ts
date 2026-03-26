import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role, Prisma } from "@/app/generated/prisma";

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
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  try {
    const kegiatan = await prisma.kegiatanRapat.findMany({
      where: {
        rekomendasiItems: { not: Prisma.DbNull },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        judul: true,
        rekomendasiItems: true,
      },
    });

    const prioritasList: Array<{
      id: string;
      deskripsi: string;
      skorPrioritas: number;
      kegiatanRapatId: string;
      kegiatanRapatJudul: string;
    }> = [];

    for (const k of kegiatan) {
      if (k.rekomendasiItems) {
        try {
          const parsed = k.rekomendasiItems as any;
          if (parsed.prioritas && Array.isArray(parsed.prioritas)) {
            for (const p of parsed.prioritas) {
              prioritasList.push({
                id: `${k.id}-${p.prioritasKe}`,
                deskripsi: p.deskripsi,
                skorPrioritas: p.skorPrioritas,
                kegiatanRapatId: k.id,
                kegiatanRapatJudul: k.judul,
              });
            }
          }
        } catch {}
      }
    }

    const result = prioritasList.slice(0, limit);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching prioritas terbaru:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
