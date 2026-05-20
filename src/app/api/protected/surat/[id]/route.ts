import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { updateSuratSchema } from "@/schema/suratSchema";
import { suratService } from "@/services/suratService";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    const { id } = await params; // 👈 await params first
    const surat = await suratService.getById(id);
    return handleResponse({
      success: true,
      data: surat,
    });
  } catch (err) {
    const prismaErr = handlePrismaError(err);
    if (prismaErr) {
      return handleResponse({
        success: false,
        message: prismaErr.message,
        status: prismaErr.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // ubah menjadi Promise
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    const body = await req.json();
    const parsed = updateSuratSchema.safeParse(body);
    if (!parsed.success) return handleZodValidation(parsed);

    const { id } = await params; // ambil id setelah di-await
    const surat = await suratService.update(id, parsed.data);
    return handleResponse({
      success: true,
      message: "Surat berhasil diperbarui",
      data: surat,
    });
  } catch (err) {
    const prismaErr = handlePrismaError(err);
    if (prismaErr) {
      return handleResponse({
        success: false,
        message: prismaErr.message,
        status: prismaErr.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // ubah menjadi Promise
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    const { id } = await params; // ambil id setelah di-await
    await suratService.delete(id);
    return handleResponse({
      success: true,
      message: "Surat berhasil dihapus",
    });
  } catch (err) {
    const prismaErr = handlePrismaError(err);
    if (prismaErr) {
      return handleResponse({
        success: false,
        message: prismaErr.message,
        status: prismaErr.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
}
