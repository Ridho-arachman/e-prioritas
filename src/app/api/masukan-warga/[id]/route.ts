import { cors } from "@/lib/cors";
import { prisma } from "@/lib/prisma";
import { extractErrors } from "@/lib/extractErrors";
import { kategoriByIdSchema } from "@/schema/kategoriSchema";
import { NextRequest, NextResponse } from "next/server";
import {
  editStatusMasukanWargaSchema,
  masukanWargaByIdSchema,
} from "@/schema/masukanWarga";
import { handleResponse } from "@/lib/responseHandler";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";

const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/masukan-warga/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // VALIDASI PARAM ID
  const { id } = await ctx.params;
  const parsedId = masukanWargaByIdSchema.safeParse({ id });
  if (!parsedId.success) {
    return handleZodValidation(parsedId, headers);
  }

  const masukanWargaId = parsedId.data.id;

  try {
    //AMBIL DATA KATEGORI DARI DATABASE BERDASARKAN ID
    const data = await prisma.masukanWarga.findUniqueOrThrow({
      where: { id: masukanWargaId },
    });

    //JIKA DATA ADA
    return NextResponse.json(
      { success: true, message: "Data masukan warga berhasil diambil", data },
      { status: 200 }
    );
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

const PATCH = async (
  req: NextRequest,
  ctx: RouteContext<"/api/masukan-warga/[id]">
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
  const parsed = editStatusMasukanWargaSchema.safeParse(body);
  const parsedId = kategoriByIdSchema.safeParse({ id });
  if (!parsedId.success)
    return NextResponse.json(
      { success: false, errors: extractErrors(parsedId) },
      { status: 400 }
    );
  if (!parsed.success)
    return NextResponse.json(
      { success: false, errors: extractErrors(parsed) },
      { status: 400 }
    );

  // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
  const { status } = parsed.data;
  const kategoriId = parsedId.data.id;

  try {
    // SIMPAN DATA KATEGORI KE DATABASE
    const kategori = await prisma.masukanWarga.update({
      where: {
        id: kategoriId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data kategori berhasil diupdate",
      data: kategori,
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

export { PATCH, GET };
