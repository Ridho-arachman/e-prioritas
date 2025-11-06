import { cors } from "@/lib/cors";
import { verifyApiToken } from "@/lib/auth";
import { userService } from "@/services/userService";
import { handleResponse } from "@/lib/responseHandler";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import {
  deleteUserPerangkatSchema,
  detailUserPerangkatSchema,
  updateUserPerangkatSchema,
} from "@/schema/userPerangkatSchema";
import { dataMasterService } from "@/services/dataMasterService";
import {
  dataMasterQueryById,
  dataMasterSchema,
} from "@/schema/dataMasterSchema";

const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/data-master/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  //VERIFIKASI JWT
  const user = await verifyApiToken(req);

  if (!user) {
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });
  }

  // AUTHORIZATION
  if (user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Anda tidak memiliki akses untuk terhadap data ini",
      status: 403,
    });
  }

  // VALIDASI PARAM ID
  const { id } = await ctx.params;
  const parsedId = dataMasterQueryById.safeParse({ id });
  if (!parsedId.success) return handleZodValidation(parsedId, headers);

  const dataMasterId = parsedId.data.id;

  try {
    //AMBIL DATA perangkat desa DARI DATABASE BERDASARKAN ID
    const data = await dataMasterService.getById(dataMasterId);

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data Master berhasil diambil",
      data,
      status: 200,
      headers,
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
  ctx: RouteContext<"/api/protected/data-master/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  //VERIFIKASI JWT
  const user = await verifyApiToken(req);

  if (!user) {
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });
  }

  // AUTHORIZATION
  if (user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Anda tidak memiliki akses untuk terhadap data ini",
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
    if (!parsedId.success) return handleZodValidation(parsedId, headers);
    if (!parsed.success) return handleZodValidation(parsed, headers);

    // SIMPAN DATA perangkat desa KE DATABASE
    const dataMaster = await dataMasterService.update(
      parsedId.data.id,
      parsed.data
    );
    return handleResponse({
      success: true,
      message: "Data Master berhasil diupdate",
      data: dataMaster,
      status: 200,
      headers,
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
  ctx: RouteContext<"/api/protected/data-master/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // VERIFIKASI JWT
  const user = await verifyApiToken(req);

  if (!user) {
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });
  }

  // AUTHORIZATION
  if (user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Anda tidak memiliki akses untuk terhadap data ini",
      status: 403,
    });
  }

  try {
    // NGGAMBIL PARAM
    const { id } = await ctx.params;

    // VALIDASI REQ PARAM
    const parsedId = deleteUserPerangkatSchema.safeParse({ id });
    if (!parsedId.success) return handleZodValidation(parsedId, headers);

    // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const dataMasterId = parsedId.data.id;

    // HAPUS DATA perangkat desa KE DATABASE
    const dataMaster = await dataMasterService.deleteById(dataMasterId);

    // JIKA DATA perangkat desa TIDAK DITEMUKAN
    return handleResponse({
      success: true,
      message: "Data master berhasil dihapus",
      data: dataMaster,
      status: 200,
      headers,
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
