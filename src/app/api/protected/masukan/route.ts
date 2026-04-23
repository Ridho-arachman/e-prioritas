// app/api/masukan/route.ts

import { Role, StatusMasukan } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { masukanWargaQuerySchema } from "@/schema/masukanWarga";
import { masukanWargaService } from "@/services/masukanWargaService";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA", "LURAH"];
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
    });
  if (!allowedRoles.includes(session.user.role as Role))
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });

  try {
    const searchParams = req.nextUrl.searchParams;

    // Sanitasi parameter: ubah string kosong menjadi undefined
    const statusParam = searchParams.get("status");
    const domainIsuIdParam = searchParams.get("domainIsuId");
    const diverifikasiOlehIdParam =
      searchParams.get("diprosesOlehId") ||
      searchParams.get("diverifikasiOlehId"); // terima kedua nama
    const lokasiParam = searchParams.get("lokasi");
    const createdAtParam = searchParams.get("createdAt");
    const qParam = searchParams.get("q");
    const pageParam = searchParams.get("page");
    const perPageParam = searchParams.get("perPage");
    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");

    const params = {
      q: qParam || undefined,
      status:
        statusParam && statusParam !== ""
          ? (statusParam as StatusMasukan)
          : undefined,
      domainIsuId:
        domainIsuIdParam && domainIsuIdParam !== ""
          ? domainIsuIdParam
          : undefined,
      diverifikasiOlehId:
        diverifikasiOlehIdParam && diverifikasiOlehIdParam !== ""
          ? diverifikasiOlehIdParam
          : undefined,
      lokasi: lokasiParam && lokasiParam !== "" ? lokasiParam : undefined,
      createdAt:
        createdAtParam && createdAtParam !== "" ? createdAtParam : undefined,
      page: pageParam ? parseInt(pageParam) : 1,
      perPage: perPageParam ? parseInt(perPageParam) : 10,
      sortBy: sortByParam || "createdAt",
      sortOrder: (sortOrderParam as "asc" | "desc") || "desc",
    };

    const validationResult = masukanWargaQuerySchema.safeParse(params);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return handleResponse({
        success: false,
        message: "Parameter tidak valid",
        errors: validationResult.error,
        status: 400,
      });
    }

    const result = await masukanWargaService.getAllMasukan(
      validationResult.data,
    );
    return handleResponse({
      success: true,
      message: "Data masukan berhasil diambil",
      data: result.data,
      meta: {
        total: result.total,
        page: result.page,
        perPage: result.perPage,
        totalPages: result.totalPages,
      },
      status: 200,
    });
  } catch (error) {
    const prismaResponse = handlePrismaError(error);
    if (prismaResponse)
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    return handleResponse({
      success: false,
      message: "Terjadi kesalahan pada server",
      status: 500,
    });
  }
};
