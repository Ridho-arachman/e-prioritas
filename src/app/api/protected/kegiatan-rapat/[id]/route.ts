// src/app/api/protected/kegiatan-rapat/[id]/route.ts
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { kegiatanRapatService } from "@/services/kegiatanRapatService";
import { NextRequest } from "next/server";
import { Role, StatusRekomendasi } from "@/app/generated/prisma";
import { headers } from "next/headers";
import { kegiatanRapatSchema } from "@/schema/kegiatanRapatSchema";

// ========================
// GET - Detail by ID
// ========================

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
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
    const kegiatanRapat = await kegiatanRapatService.getById(id);

    return handleResponse({
      success: true,
      message: "Data Berhasil Ditemukan",
      data: {
        ...kegiatanRapat,
        _rekomendasiParsed: kegiatanRapat.rekomendasiItems,
      },
      status: 200,
    });
  } catch (err) {
    console.error("GET BY ID ERROR:", err);
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
};

// ========================
// PUT - Update by ID
// ========================

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
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
    const body = await req.json();
    const { id } = await params;

    const parsed = kegiatanRapatSchema.partial().safeParse(body);
    console.log(parsed);
    if (!parsed.success) {
      return handleResponse({
        success: false,
        message: "Validasi gagal",
        errors: parsed.error.flatten().fieldErrors,
        status: 400,
      });
    }

    const kegiatanRapat = await kegiatanRapatService.update(id, parsed.data);

    return handleResponse({
      success: true,
      message: "Kegiatan Berhasil Diperbarui",
      data: kegiatanRapat,
      status: 200,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
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
};

// ========================
// DELETE - Delete by ID
// ========================

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
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
    await kegiatanRapatService.deleteById(id);

    return handleResponse({
      success: true,
      message: "Kegiatan Berhasil Dihapus",
      status: 200,
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);
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
};
