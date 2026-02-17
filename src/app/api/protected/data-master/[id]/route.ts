import { handleResponse } from "@/lib/handleResponse";
import { NextRequest } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { dataMasterService } from "@/services/dataMasterService";
import {
  dataMasterParamSchema, // schema untuk validasi ID
  dataMasterSchema, // schema untuk create (bisa dipartial untuk update)
} from "@/schema/dataMasterSchema";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Tipe context untuk params (sesuaikan jika diperlukan)
type Params = { id: string };
type RouteContext = { params: Params };

export const GET = async (_req: NextRequest, ctx: RouteContext) => {
  const allowedRoles: Role[] = ["ADMIN"];
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
    const { id } = await ctx.params;
    const parsedId = dataMasterParamSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    const dataMasterId = parsedId.data.id;
    const data = await dataMasterService.getById(dataMasterId);

    return handleResponse({
      success: true,
      message: "Data Master berhasil diambil",
      data,
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

export const PUT = async (req: NextRequest, ctx: RouteContext) => {
  const allowedRoles: Role[] = ["ADMIN"];
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
    const { id } = await ctx.params;
    const body = await req.json();

    // Validasi ID
    const parsedId = dataMasterParamSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    // Untuk update, semua field bersifat opsional → gunakan partial dari schema
    const updateSchema = dataMasterSchema.partial();
    const parsedBody = updateSchema.safeParse(body);
    if (!parsedBody.success) return handleZodValidation(parsedBody);

    // Tambahkan informasi user yang melakukan update
    const updateData = {
      ...parsedBody.data,
      diprosesOlehId: session.user.id, // catat siapa yang terakhir mengubah
    };

    const dataMaster = await dataMasterService.update(
      parsedId.data.id,
      updateData,
    );

    return handleResponse({
      success: true,
      message: "Data Master berhasil diupdate",
      data: dataMaster,
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

export const DELETE = async (_req: NextRequest, ctx: RouteContext) => {
  const allowedRoles: Role[] = ["ADMIN"];
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
    const { id } = await ctx.params;
    const parsedId = dataMasterParamSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    const dataMasterId = parsedId.data.id;
    const dataMaster = await dataMasterService.deleteById(dataMasterId);

    return handleResponse({
      success: true,
      message: "Data master berhasil dihapus",
      data: dataMaster,
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
