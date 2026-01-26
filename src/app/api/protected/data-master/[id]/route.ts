import { handleResponse } from "@/lib/handleResponse";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { deleteUserPerangkatSchema } from "@/schema/userPerangkatSchema";
import { dataMasterService } from "@/services/dataMasterService";
import {
  dataMasterQueryById,
  dataMasterSchema,
} from "@/schema/dataMasterSchema";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const GET = async (
  _req: NextRequest,
  ctx: RouteContext<"/api/protected/data-master/[id]">,
) => {
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
    // VALIDASI PARAM ID
    const { id } = await ctx.params;
    const parsedId = dataMasterQueryById.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    const dataMasterId = parsedId.data.id;

    //AMBIL DATA perangkat desa DARI DATABASE BERDASARKAN ID
    const data = await dataMasterService.getById(dataMasterId);

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data Master berhasil diambil",
      data,
      status: 200,
    });
  } catch (err) {
    //PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

const PUT = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/data-master/[id]">,
) => {
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
    // NGGAMBIL REQ BODY & PARAM
    const { id } = await ctx.params;
    const body = await req.json();

    // VALIDASI REQ BODY & PARAM
    const parsed = dataMasterSchema.safeParse(body);
    const parsedId = dataMasterQueryById.safeParse({ id });

    if (!parsedId.success) return handleZodValidation(parsedId);
    if (!parsed.success) return handleZodValidation(parsed);

    // SIMPAN DATA perangkat desa KE DATABASE
    const dataMaster = await dataMasterService.update(
      parsedId.data.id,
      parsed.data,
    );
    return handleResponse({
      success: true,
      message: "Data Master berhasil diupdate",
      data: dataMaster,
      status: 200,
    });
  } catch (err) {
    //PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

const DELETE = async (
  _req: NextRequest,
  ctx: RouteContext<"/api/protected/data-master/[id]">,
) => {
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

    const parsedId = deleteUserPerangkatSchema.safeParse({ id });
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
    //PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

export { PUT, DELETE, GET };
