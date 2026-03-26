import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role, StatusRekomendasi } from "@/app/generated/prisma";

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
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      prisma.kegiatanRapat.findMany({
        where: { statusRekomendasi: StatusRekomendasi.DIAJUKAN },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          domainIsu: { select: { nama: true, code: true } },
          dibuatOleh: { select: { name: true, jabatan: true } },
        },
      }),
      prisma.kegiatanRapat.count({
        where: { statusRekomendasi: StatusRekomendasi.DIAJUKAN },
      }),
    ]);

    return NextResponse.json({ success: true, data, total, page, limit });
  } catch (error) {
    console.error("Error fetching kegiatan menunggu:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
