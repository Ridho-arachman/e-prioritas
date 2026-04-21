// app/api/protected/program-kelurahan/[id]/route.ts
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import {
  programKelurahanParamSchema,
  programKelurahanUpdateSchema,
} from "@/schema/programKelurahanSchema";
import { programKelurahanService } from "@/services/programKelurahanService";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH", "PERANGKAT_DESA"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
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
    const { id } = await ctx.params;
    const parsed = programKelurahanParamSchema.safeParse({ id });
    if (!parsed.success) return handleZodValidation(parsed);

    const program = await programKelurahanService.getById(parsed.data.id);
    return handleResponse({
      success: true,
      message: "Detail program berhasil diambil",
      data: program,
      status: 200,
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
};

export const PUT = async (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
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
    const { id } = await ctx.params;
    const paramParsed = programKelurahanParamSchema.safeParse({ id });
    if (!paramParsed.success) return handleZodValidation(paramParsed);

    const body = await req.json();
    const bodyParsed = programKelurahanUpdateSchema.safeParse(body);
    if (!bodyParsed.success) return handleZodValidation(bodyParsed);

    const updateData = {
      ...bodyParsed.data,
      tanggalMulai: bodyParsed.data.tanggalMulai
        ? new Date(bodyParsed.data.tanggalMulai)
        : bodyParsed.data.tanggalMulai === null
          ? null
          : undefined,
      tanggalSelesai: bodyParsed.data.tanggalSelesai
        ? new Date(bodyParsed.data.tanggalSelesai)
        : bodyParsed.data.tanggalSelesai === null
          ? null
          : undefined,
    };

    const program = await programKelurahanService.update(
      paramParsed.data.id,
      updateData,
    );

    return handleResponse({
      success: true,
      message: "Program berhasil diperbarui",
      data: program,
      status: 200,
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
};

export const DELETE = async (
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
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
    const { id } = await ctx.params;
    const parsed = programKelurahanParamSchema.safeParse({ id });
    if (!parsed.success) return handleZodValidation(parsed);

    await programKelurahanService.delete(parsed.data.id);
    return handleResponse({
      success: true,
      message: "Program berhasil dihapus",
      status: 200,
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
};
