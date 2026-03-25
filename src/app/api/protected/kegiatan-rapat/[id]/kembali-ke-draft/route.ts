// app/api/protected/kegiatan-rapat/[id]/kembali-ke-draft/route.ts
import { auth } from "@/lib/auth";
import { handleResponse } from "@/lib/handleResponse";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { Role, StatusRekomendasi, StatusMasukan } from "@/app/generated/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA"];

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
      include: {
        masukanRelasi: {
          select: { masukanId: true },
        },
      },
    });

    if (!kegiatan) {
      return handleResponse({
        success: false,
        message: "Kegiatan tidak ditemukan",
        status: 404,
      });
    }

    // Cek apakah user adalah pembuat atau admin
    if (
      session.user.role === Role.ADMIN &&
      kegiatan.dibuatOlehId !== session.user.id
    ) {
      return handleResponse({
        success: false,
        message: "Anda tidak berhak mengubah kegiatan ini",
        status: 403,
      });
    }

    // Update status kegiatan menjadi DRAFT
    const updated = await prisma.kegiatanRapat.update({
      where: { id },
      data: {
        statusRekomendasi: StatusRekomendasi.DRAFT,
      },
    });

    return handleResponse({
      success: true,
      message: "Kegiatan berhasil dikembalikan ke draft",
      data: updated,
      status: 200,
    });
  } catch (error) {
    console.error("Error mengembalikan kegiatan ke draft:", error);
    return handleResponse({
      success: false,
      message: "Terjadi kesalahan pada server",
      status: 500,
    });
  }
}
