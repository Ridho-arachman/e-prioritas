import { cors } from "@/lib/cors";
import { handleResponse } from "@/lib/responseHandler";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { kategoriService } from "@/services/kategoriService";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { kategoriByIdSchema, kategoriSchema } from "@/schema/kategoriSchema";

const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/kategori/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // VALIDASI PARAM ID
  const { id } = await ctx.params;
  const parsedId = kategoriByIdSchema.safeParse({ id });
  if (!parsedId.success) {
    return handleZodValidation(parsedId, headers);
  }

  const kategoriId = parsedId.data.id;

  try {
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
        headers,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
};

const PUT = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/kategori/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // NGGAMBIL REQ BODY & PARAM
  const { id } = await ctx.params;
  const body = await req.json();

  // VALIDASI REQ BODY & PARAM
  const parsed = kategoriSchema.safeParse(body);
  const parsedId = kategoriByIdSchema.safeParse({ id });
  if (!parsedId.success) return handleZodValidation(parsedId, headers);
  if (!parsed.success) return handleZodValidation(parsed, headers);

  // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
  const data = parsed.data;
  const kategoriId = parsedId.data.id;

  try {
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
        headers,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
};

const DELETE = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/kategori/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // NGGAMBIL PARAM
  const { id } = await ctx.params;

  // VALIDASI REQ BODY & PARAM
  const parsedId = kategoriByIdSchema.safeParse({ id });
  if (!parsedId.success) return handleZodValidation(parsedId, headers);

  // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
  const kategoriId = parsedId.data.id;

  try {
    // HAPUS DATA KATEGORI KE DATABASE
    const kategori = await kategoriService.delete(kategoriId);

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
        headers,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
};

export { PUT, DELETE, GET };
