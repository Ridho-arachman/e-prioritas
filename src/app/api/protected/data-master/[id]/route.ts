import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import {
  dataMasterParamSchema,
  dataMasterUpdateSchema,
} from "@/schema/dataMasterSchema";
import { dataMasterService } from "@/services/dataMasterService";
import { NextRequest } from "next/server";
import { Role } from "@/app/generated/prisma";
import { headers } from "next/headers";

type Params = { id: string };
type RouteContext = { params: Promise<Params> };

const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA"];

// Helper cek auth (bisa dipisah ke file utils jika ingin)
const checkAuth = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      authorized: false,
      message: "User belum login",
      status: 401,
      user: null,
    };
  }
  if (!allowedRoles.includes(session.user.role as Role)) {
    return {
      authorized: false,
      message: "Akses ditolak",
      status: 403,
      user: null,
    };
  }
  return { authorized: true, user: session.user };
};

// GET by ID
export const GET = async (_req: NextRequest, ctx: RouteContext) => {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return handleResponse({
      success: false,
      message: authCheck.message,
      status: authCheck.status,
    });
  }

  try {
    const { id } = await ctx.params;
    const parsedId = dataMasterParamSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    const data = await dataMasterService.getById(parsedId.data.id);

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

// PUT (update) by ID
export const PUT = async (req: NextRequest, ctx: RouteContext) => {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return handleResponse({
      success: false,
      message: authCheck.message,
      status: authCheck.status,
    });
  }

  try {
    const { id } = await ctx.params;
    const body = await req.json();

    const parsedId = dataMasterParamSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    const parsedBody = dataMasterUpdateSchema.safeParse(body);
    if (!parsedBody.success) return handleZodValidation(parsedBody);

    const updateData = {
      ...parsedBody.data,
      diprosesOlehId: authCheck.user?.id,
    };

    const updated = await dataMasterService.update(
      parsedId.data.id,
      updateData,
    );

    return handleResponse({
      success: true,
      message: "Data Master berhasil diupdate",
      data: updated,
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

// DELETE by ID
export const DELETE = async (_req: NextRequest, ctx: RouteContext) => {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return handleResponse({
      success: false,
      message: authCheck.message,
      status: authCheck.status,
    });
  }

  try {
    const { id } = await ctx.params;
    const parsedId = dataMasterParamSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    await dataMasterService.deleteById(parsedId.data.id);

    return handleResponse({
      success: true,
      message: "Data Master berhasil dihapus",
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
