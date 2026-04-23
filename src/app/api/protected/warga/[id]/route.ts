import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { wargaParamSchema, wargaUpdateSchema } from "@/schema/wargaSchema";
import { wargaService } from "@/services/wargaService";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH", "PERANGKAT_DESA"];
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
    });
  if (!allowedRoles.includes(session.user.role as Role))
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });

  try {
    const { id } = await ctx.params;
    const parsed = wargaParamSchema.safeParse({ id });
    if (!parsed.success) return handleZodValidation(parsed);

    const warga = await wargaService.getById(parsed.data.id);
    return handleResponse({
      success: true,
      message: "Detail warga berhasil diambil",
      data: warga,
      status: 200,
    });
  } catch (err) {
    const prismaError = handlePrismaError(err);
    if (prismaError)
      return handleResponse({
        success: false,
        message: prismaError.message,
        status: prismaError.status,
      });
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
  if (!session)
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
    });
  if (!allowedRoles.includes(session.user.role as Role))
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });

  try {
    const { id } = await ctx.params;
    const paramParsed = wargaParamSchema.safeParse({ id });
    if (!paramParsed.success) return handleZodValidation(paramParsed);

    const body = await req.json();
    const bodyParsed = wargaUpdateSchema.safeParse(body);
    if (!bodyParsed.success) return handleZodValidation(bodyParsed);

    const warga = await wargaService.update(
      paramParsed.data.id,
      bodyParsed.data,
    );
    return handleResponse({
      success: true,
      message: "Warga berhasil diperbarui",
      data: warga,
      status: 200,
    });
  } catch (err) {
    const prismaError = handlePrismaError(err);
    if (prismaError)
      return handleResponse({
        success: false,
        message: prismaError.message,
        status: prismaError.status,
      });
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

export const DELETE = async (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH"];
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
    });
  if (!allowedRoles.includes(session.user.role as Role))
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });

  try {
    const { id } = await ctx.params;
    const parsed = wargaParamSchema.safeParse({ id });
    if (!parsed.success) return handleZodValidation(parsed);

    await wargaService.delete(parsed.data.id);
    return handleResponse({
      success: true,
      message: "Warga berhasil dihapus",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    const prismaError = handlePrismaError(err);
    if (prismaError)
      return handleResponse({
        success: false,
        message: prismaError.message,
        status: prismaError.status,
      });
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};
