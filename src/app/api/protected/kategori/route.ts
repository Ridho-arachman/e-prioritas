import { handleResponse } from "@/lib/handleResponse";
import { NextRequest } from "next/server";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { kategoriService } from "@/services/kategoriService";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { kategoriQuerySchema, kategoriSchema } from "@/schema/kategoriSchema";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const GET = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH", "PERANGKAT_DESA"];
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
    const searchParams = req.nextUrl.searchParams;
    const nama = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "10");

    const parsed = kategoriQuerySchema.safeParse({ nama });
    console.log(parsed);
    if (!parsed.success) return handleZodValidation(parsed);

    const namaParam = parsed.data.nama;

    const { data, meta } = await kategoriService.getAll({
      nama: namaParam,
      page,
      perPage,
    });

    if (data.length === 0) {
      return handleResponse({
        success: true,
        message: nama
          ? "Data kategori tidak ditemukan"
          : "Data kategori masih kosong",
        status: 200,
        data: [],
        meta,
      });
    }

    return handleResponse({
      success: true,
      message: "Data kategori berhasil diambil",
      data,
      status: 200,
      meta,
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
    const { nama, deskripsi, code } = parsed.data;

    //SIMPAN DATA KATEGORI KE DATABASE
    const kategori = await kategoriService.create({
      nama,
      deskripsi,
      code,
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
