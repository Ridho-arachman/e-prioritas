import { handleResponse } from "@/lib/handleResponse";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { kategoriService } from "@/services/kategoriService";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { kategoriQuerySchema, kategoriSchema } from "@/schema/kategoriSchema";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const GET = async (req: NextRequest) => {
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
    //AMBIL QUERY
    const searchParams = req.nextUrl.searchParams;
    const namaKategori = searchParams.get("search");

    //VALIDASI QUERY
    let namaKategoriParam: string | undefined;
    if (namaKategori) {
      const parsed = kategoriQuerySchema.safeParse({ namaKategori });
      if (!parsed.success) {
        return handleZodValidation(parsed);
      }
      namaKategoriParam = parsed.data.namaKategori;
    }

    //AMBIL DATA KATEGORI DARI DATABASE
    const data = await kategoriService.getAll(namaKategoriParam);

    //JIKA DATA KOSONG

    if (data.length === 0) {
      if (namaKategoriParam)
        return handleResponse({
          success: true,
          message: "Data kategori tidak ditemukan",
          status: 404,
        });

      return handleResponse({
        success: true,
        message: "Data kategori masih kosong",
        status: 404,
      });
    }

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

const POST = async (req: NextRequest) => {
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
    //VALIDASI REQ BODY
    const body = await req.json();
    const parsed = kategoriSchema.safeParse(body);

    if (!parsed.success) return handleZodValidation(parsed);

    //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const { namaKategori, deskripsi, status } = parsed.data;
    
    //SIMPAN DATA KATEGORI KE DATABASE
    const kategori = await kategoriService.create({
      namaKategori,
      deskripsi,
      status,
    });

    return handleResponse({
      success: true,
      message: "Kategori Berhasil Ditambahkan",
      data: kategori,
      status: 201,
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

export { GET, POST };
