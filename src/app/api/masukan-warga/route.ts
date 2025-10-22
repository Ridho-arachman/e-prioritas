import { cors } from "@/lib/cors";
import { prisma } from "@/lib/prisma";
import { extractErrors } from "@/lib/extractErrors";
import { NextRequest, NextResponse } from "next/server";
import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import { masukanWargaQuerySchema } from "@/schema/masukanWarga";
import { handleResponse } from "@/lib/responseHandler";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { masukanWargaService } from "@/services/masukanWargaService";

const GET = async (req: NextRequest) => {
  // CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // AMBIL QUERY PARAMETER
  const searchParams = req.nextUrl.searchParams;
  const query = {
    namaPengirim: searchParams.get("namaPengirim") ?? undefined,
    emailPengirim: searchParams.get("emailPengirim") ?? undefined,
    lokasiRtrw: searchParams.get("lokasiRtrw") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    kategoriId: searchParams.get("kategoriId") ?? undefined,
  };

  // VALIDASI QUERY PARAMETER DENGAN ZOD
  const parsed = masukanWargaQuerySchema.safeParse(query);
  if (!parsed.success) {
    return handleZodValidation(parsed, headers);
  }

  // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
  const filters = parsed.data;

  try {
    // BUAT KONDISI WHERE UNTUK FILTERING
    const where: any = {};
    if (filters.namaPengirim)
      where.namaPengirim = {
        contains: filters.namaPengirim,
        mode: "insensitive",
      };
    if (filters.emailPengirim)
      where.emailPengirim = {
        contains: filters.emailPengirim,
        mode: "insensitive",
      };
    if (filters.lokasiRtrw)
      where.lokasiRtrw = {
        contains: filters.lokasiRtrw,
        mode: "insensitive",
      };
    if (filters.status) where.status = filters.status;
    if (filters.kategoriId) where.kategoriId = filters.kategoriId;

    // AMBIL DATA MASUKAN WARGA DARI DATABASE DENGAN FILTERING
    const data = await masukanWargaService.getAll(where);

    // JIKA DATA KOSONG
    if (data.length === 0)
      return handleResponse({
        success: true,
        message: "Data masukan warga tidak ditemukan",
        status: 404,
        headers,
      });

    return handleResponse({
      success: true,
      message: "Data masukan warga berhasil diambil",
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

  //NGGAMBIL REQ BODY
  const body = await req.json();

  // VALIDASI REQ BODY DENGAN ZOD
  const parsed = createMasukanWargaSchema.safeParse(body);
  if (!parsed.success) {
    return handleZodValidation(parsed, headers);
  }

  //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
  const {
    deskripsiMasukan,
    emailPengirim,
    kategoriId,
    lokasiRtrw,
    namaPengirim,
    verifiedByUserId,
  } = parsed.data;

  const data = {
    deskripsiMasukan,
    emailPengirim,
    kategoriId,
    lokasiRtrw,
    namaPengirim,
    verifiedByUserId,
  };

  try {
    //SIMPAN DATA MASUKAN WARGA KE DATABASE
    const masukanWarga = await masukanWargaService.create(data);

    //JIKA SIMPAN DATA MASUKAN WARGA BERHASIL
    return handleResponse({
      success: true,
      message: "Masukan Berhasil Ditambahkan",
      data: masukanWarga,
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
