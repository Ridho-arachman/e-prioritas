// app/api/masukan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { masukanWargaService } from "@/services/masukanWargaService";
import { masukanWargaQuerySchema } from "@/schema/masukanWarga";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { StatusMasukan } from "@/app/generated/prisma";

export const GET = async (req: NextRequest) => {
  try {
    // Cek autentikasi
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return handleResponse({
        success: false,
        message: "User belum login",
        status: 401,
      });
    }

    // Hanya ADMIN yang bisa akses
    if (session.user.role !== "ADMIN") {
      return handleResponse({
        success: false,
        message: "Akses ditolak. Hanya admin yang bisa melihat data masukan.",
        status: 403,
      });
    }

    // Parse query parameters
    const searchParams = req.nextUrl.searchParams;

    const params = {
      q: searchParams.get("q") || undefined,
      status: (searchParams.get("status") as StatusMasukan) || undefined,
      domainIsuId: searchParams.get("domainIsuId") || undefined,
      diverifikasiOlehId: searchParams.get("diverifikasiOlehId") || undefined,
      createdAt: searchParams.get("createdAt") || undefined,
      page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
      perPage: searchParams.get("perPage")
        ? parseInt(searchParams.get("perPage")!)
        : 10,
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    };

    // Validasi menggunakan schema (sesuaikan schema jika perlu)
    const validationResult = masukanWargaQuerySchema.safeParse({
      q: params.q,
      status: params.status,
      kategoriId: params.domainIsuId, // Map domainIsuId ke kategoriId untuk schema lama
      diverifikasiOlehId: params.diverifikasiOlehId,
      createdAt: params.createdAt,
    });

    if (!validationResult.success) {
      return handleResponse({
        success: false,
        message: "Parameter tidak valid",
        errors: validationResult.error,
        status: 400,
      });
    }

    // Panggil service dengan parameter baru
    const result = await masukanWargaService.getAllMasukan(params);

    if (result.data.length === 0) {
      return handleResponse({
        success: true,
        message: "Tidak ada data masukan yang ditemukan",
        data: [],
        meta: result.meta,
        status: 200,
      });
    }

    return handleResponse({
      success: true,
      message: "Data masukan berhasil diambil",
      data: result.data,
      meta: result.meta,
      status: 200,
    });
  } catch (error) {
    console.log("Error fetching masukan:", error);

    const prismaResponse = handlePrismaError(error);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi kesalahan pada server",
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Validasi input menggunakan schema createMasukanWargaSchema
    // ... (implementasi create)

    return handleResponse({
      success: true,
      message: "Masukan berhasil dibuat",
      status: 201,
    });
  } catch (error) {
    // Handle error
    return handleResponse({
      success: false,
      message: "Gagal membuat masukan",
      status: 500,
    });
  }
};
