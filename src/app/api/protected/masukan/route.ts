// app/api/masukan/route.ts

import { NextRequest } from "next/server";
import { masukanWargaService } from "@/services/masukanWargaService";
import { masukanWargaQuerySchema } from "@/schema/masukanWarga";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role, StatusMasukan } from "@/app/generated/prisma";

export const GET = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
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

    const params = {
      q: searchParams.get("q") || undefined,
      status: (searchParams.get("status") as StatusMasukan) || undefined,
      domainIsuId: searchParams.get("domainIsuId") || undefined,
      diprosesOlehId: searchParams.get("diprosesOlehId") || undefined,
      createdAt: searchParams.get("createdAt") || undefined,
      page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
      perPage: searchParams.get("perPage")
        ? parseInt(searchParams.get("perPage")!)
        : 10,
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    };

    const validationResult = masukanWargaQuerySchema.safeParse({
      q: params.q,
      status: params.status,
      kategoriId: params.domainIsuId, // backward compatibility schema lama
      diprosesOlehId: params.diprosesOlehId,
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

    const result = await masukanWargaService.getAllMasukan(params);

    return handleResponse({
      success: true,
      message: "Data masukan berhasil diambil",
      data: result.data,
      meta: result.meta,
      status: 200,
    });
  } catch (error) {
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
