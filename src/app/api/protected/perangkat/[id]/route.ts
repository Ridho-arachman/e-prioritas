import { userService } from "@/services/userService";
import { handleResponse } from "@/lib/handleResponse";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import {
  deleteUserPerangkatSchema,
  detailUserPerangkatSchema,
  updateUserPerangkatSchema,
} from "@/schema/userPerangkatSchema";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { api } from "@/lib/api";

const GET = async (
  _req: NextRequest,
  ctx: RouteContext<"/api/protected/perangkat/[id]">,
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
    console.log(id);

    const parsedId = detailUserPerangkatSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    const userId = parsedId.data.id;

    const data = await userService.getById(userId);

    return handleResponse({
      success: true,
      message: "Data perangkat desa berhasil diambil",
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

const PATCH = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/perangkat/[id]">,
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
    const parsed = updateUserPerangkatSchema.safeParse(body);
    const parsedId = detailUserPerangkatSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);
    if (!parsed.success) return handleZodValidation(parsed);

    const userId = parsedId.data.id;
    const data = parsed.data;

    const kategori = await userService.update(data, userId);

    return handleResponse({
      success: true,
      message: "Data perangkat desa berhasil diupdate",
      data: kategori,
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
  ctx: RouteContext<"/api/protected/perangkat/[id]">,
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
    // NGGAMBIL PARAM
    const { id } = await ctx.params;

    // VALIDASI REQ PARAM
    const parsedId = deleteUserPerangkatSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const userId = parsedId.data.id;

    // HAPUS DATA perangkat desa KE DATABASE
    const kategori = await userService.deleteById(userId);

    // JIKA DATA perangkat desa TIDAK DITEMUKAN
    return handleResponse({
      success: true,
      message: "Data perangkat desa berhasil dihapus",
      data: kategori,
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

export { PATCH, DELETE, GET };
