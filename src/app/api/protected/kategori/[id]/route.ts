import { handleResponse } from "@/lib/handleResponse";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { kategoriService } from "@/services/kategoriService";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { kategoriByIdSchema, kategoriSchema } from "@/schema/kategoriSchema";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const GET = async (
  _req: NextRequest,
  ctx: RouteContext<"/api/protected/kategori/[id]">,
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
    const parsedId = kategoriByIdSchema.safeParse({ id });
    if (!parsedId.success) {
      return handleZodValidation(parsedId);
    }
    const kategoriId = parsedId.data.id;

    //AMBIL DATA KATEGORI DARI DATABASE BERDASARKAN ID
    const data = await kategoriService.getById(kategoriId);

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data kategori berhasil diambil",
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
  ctx: RouteContext<"/api/protected/kategori/[id]">,
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
    const parsed = kategoriSchema.safeParse(body);
    const parsedId = kategoriByIdSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);
    if (!parsed.success) return handleZodValidation(parsed);

    // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const data = parsed.data;
    const kategoriId = parsedId.data.id;

    // SIMPAN DATA KATEGORI KE DATABASE
    const kategori = await kategoriService.update(kategoriId, data);
    return handleResponse({
      success: true,
      message: "Data kategori berhasil diupdate",
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
  ctx: RouteContext<"/api/protected/kategori/[id]">,
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

    // VALIDASI REQ BODY & PARAM
    const parsedId = kategoriByIdSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId);

    // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const kategoriId = parsedId.data.id;

    // HAPUS DATA KATEGORI KE DATABASE
    const kategori = await kategoriService.deleteById(kategoriId);

    // JIKA DATA KATEGORI TIDAK DITEMUKAN
    return handleResponse({
      success: true,
      message: "Data kategori berhasil dihapus",
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

export { PUT, DELETE, GET };
