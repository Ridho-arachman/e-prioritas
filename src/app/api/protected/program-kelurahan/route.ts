import { Role, StatusProgram } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import {
  programKelurahanCreateSchema,
  programKelurahanQuerySchema,
} from "@/schema/programKelurahanSchema";
import { programKelurahanService } from "@/services/programKelurahanService";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH", "PERANGKAT_DESA"];
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
    const parsed = programKelurahanQuerySchema.safeParse({
      q: searchParams.get("q") || undefined,
      status: searchParams.get("status") || undefined,
      domainIsuId: searchParams.get("domainIsuId") || undefined,
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
      sortBy: searchParams.get("sortBy") || "updatedAt",
      sortOrder: searchParams.get("sortOrder") || "desc",
    });

    if (!parsed.success) return handleZodValidation(parsed);

    const data = parsed.data;
    const result = await programKelurahanService.getAll({
      search: data.q,
      status: data.status as StatusProgram,
      domainIsuId: data.domainIsuId,
      page: data.page,
      limit: data.limit,
      sortBy: data.sortBy,
      sortOrder: data.sortOrder,
    });

    return handleResponse({
      success: true,
      message:
        result.data.length === 0
          ? "Tidak ada data program"
          : "Data program berhasil diambil",
      data: result.data,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
      status: 200,
    });
  } catch (err) {
    console.error("[PROGRAM_KELURAHAN_GET] Error:", err);
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH"];
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
    const body = await req.json();
    const parsed = programKelurahanCreateSchema.safeParse(body);

    if (!parsed.success) return handleZodValidation(parsed);

    // Konversi string date ke Date object
    const payload = {
      ...parsed.data,
      tanggalMulai: parsed.data.tanggalMulai
        ? new Date(parsed.data.tanggalMulai)
        : null,
      tanggalSelesai: parsed.data.tanggalSelesai
        ? new Date(parsed.data.tanggalSelesai)
        : null,
    };

    const program = await programKelurahanService.create(payload);

    return handleResponse({
      success: true,
      message: "Program kelurahan berhasil ditambahkan",
      data: program,
      status: 201,
    });
  } catch (err) {
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};
