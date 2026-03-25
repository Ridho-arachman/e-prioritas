// app/api/protected/kegiatan-rapat/[id]/ajukan/route.ts
import { auth } from "@/lib/auth";
import { handleResponse } from "@/lib/handleResponse";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { Role, StatusRekomendasi } from "@/app/generated/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const allowedRoles: Role[] = ["ADMIN", "LURAH", "PERANGKAT_DESA"];

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
  try {
    const { id } = await params;

    // Update status menjadi DIAJUKAN
    const updated = await prisma.kegiatanRapat.update({
      where: { id },
      data: { statusRekomendasi: StatusRekomendasi.DIAJUKAN },
    });

    return handleResponse({
      success: true,
      message: "Kegiatan berhasil diajukan ke lurah",
      data: updated,
      status: 200,
    });
  } catch (error) {
    console.error("Error mengajukan kegiatan:", error);
    return handleResponse({
      success: false,
      message: "Terjadi kesalahan pada server",
      status: 500,
    });
  }
}
