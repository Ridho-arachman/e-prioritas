// app/api/protected/kegiatan-rapat/[id]/terima/route.ts
import { auth } from "@/lib/auth";
import { handleResponse } from "@/lib/handleResponse";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { Role, StatusRekomendasi, StatusMasukan } from "@/app/generated/prisma";
import { handlePrismaError } from "@/lib/handlePrismaError";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const allowedRoles: Role[] = ["LURAH"];

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

    // Ambil kegiatan beserta relasi masukan
    const kegiatan = await prisma.kegiatanRapat.findUnique({
      where: { id },
    });

    if (!kegiatan) {
      return handleResponse({
        success: false,
        message: "Kegiatan tidak ditemukan",
        status: 404,
      });
    }

    // Validasi status harus DIAJUKAN
    if (kegiatan.statusRekomendasi !== StatusRekomendasi.DIAJUKAN) {
      return handleResponse({
        success: false,
        message: "Hanya kegiatan dengan status DIAJUKAN yang dapat diterima",
        status: 400,
      });
    }

    // Update status kegiatan menjadi DISETUJUI
    const updated = await prisma.kegiatanRapat.update({
      where: { id },
      data: {
        statusRekomendasi: StatusRekomendasi.DISETUJUI,
        diprosesOlehId: session.user.id,
      },
    });

    return handleResponse({
      success: true,
      message: "Kegiatan berhasil diterima",
      data: updated,
      status: 200,
    });
  } catch (error) {
    console.error("Error menerima kegiatan:", error);
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
      message: "Terjadi kesalahan pada server",
      status: 500,
    });
  }
}
