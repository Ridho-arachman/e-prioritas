import { cors } from "@/lib/cors";
import { handleResponse } from "@/lib/responseHandler";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { kategoriService } from "@/services/kategoriService";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { kategoriQuerySchema, kategoriSchema } from "@/schema/kategoriSchema";

const GET = async (req: NextRequest) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  //AMBIL QUERY
  const searchParams = req.nextUrl.searchParams;
  const namaKategori = searchParams.get("search");

  //VALIDASI QUERY
  let namaKategoriParam: string | undefined;
  if (namaKategori) {
    const parsed = kategoriQuerySchema.safeParse({ namaKategori });
    if (!parsed.success) {
      return handleZodValidation(parsed, headers);
    }
    namaKategoriParam = parsed.data.namaKategori;
  }

  try {
    //AMBIL DATA KATEGORI DARI DATABASE
    const data = await kategoriService.getAll(namaKategoriParam);

    //JIKA DATA KOSONG
    if (data.length === 0) {
      return handleResponse({
        success: true,
        message: "Data kategori tidak ditemukan",
        status: 404,
        headers,
      });
    }

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data kategori berhasil diambil",
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

const POST = async (req: NextRequest) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  //VALIDASI REQ BODY
  const body = await req.json();
  const parsed = kategoriSchema.safeParse(body);

  if (!parsed.success) return handleZodValidation(parsed, headers);

  //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
  const { namaKategori, deskripsi } = parsed.data;

  try {
    //SIMPAN DATA KATEGORI KE DATABASE
    const kategori = await kategoriService.create({
      namaKategori,
      deskripsi,
    });

    return handleResponse({
      success: true,
      message: "Kategori Berhasil Ditambahkan",
      data: kategori,
      status: 201,
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

export { GET, POST };
