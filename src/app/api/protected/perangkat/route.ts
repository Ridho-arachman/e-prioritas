import { verifyApiToken } from "@/lib/auth";
import { cors } from "@/lib/cors";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { hashPassword } from "@/lib/hashing";
import { handleResponse } from "@/lib/responseHandler";
import {
  createUserSchema,
  queryUserSchema,
} from "@/schema/userPerangkatSchema";
import { userService } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
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
    //AMBIL QUERY
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const isActive = searchParams.get("isActive") || undefined;

    //VALIDASI QUERY
    const parsed = queryUserSchema.safeParse({ q, isActive });
    if (!parsed.success) return handleZodValidation(parsed, headers);

    //HASIL VALIDASI
    const { isActive: isActiveParam, q: queryUser } = parsed.data;

    //AMBIL DATA KATEGORI DARI DATABASE
    const data = await userService.getAll(queryUser, isActiveParam);

    //JIKA DATA KOSONG

    if (data.length === 0) {
      if (queryUser)
        return handleResponse({
          success: true,
          message: "Data kategori tidak ditemukan",
          status: 404,
          headers,
        });

      return handleResponse({
        success: true,
        message: "Data kategori masih kosong",
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
    //VALIDASI REQ BODY
    const body = await req.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) return handleZodValidation(parsed, headers);

    //
    const hashedPassword = await hashPassword(parsed.data.password);

    //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const data = { ...parsed.data, password: hashedPassword };

    //SIMPAN DATA KATEGORI KE DATABASE
    const kategori = await userService.create(data);

    //BERHASIL
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
