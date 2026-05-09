// src/app/api/protected/kegiatan-rapat/route.ts
import { Role, StatusRekomendasi } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { kegiatanRapatQuerySchema } from "@/schema/kegiatanRapatSchema";
import { kegiatanRapatService } from "@/services/kegiatanRapatService";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

dayjs.extend(utc);
dayjs.extend(timezone);

// ========================
// GET - List Kegiatan Rapat
// ========================

export const GET = async (req: NextRequest) => {
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

    const parsed = kegiatanRapatQuerySchema.safeParse({
      q: searchParams.get("q") || undefined,
      judul: searchParams.get("judul") || undefined,
      lokasi: searchParams.get("lokasi") || undefined,
      domainIsuId: searchParams.get("domainIsuId") || undefined,
      dibuatOlehId: searchParams.get("dibuatOlehId") || undefined,
      diprosesOlehId: searchParams.get("diprosesOlehId") || undefined,
      aiModel: searchParams.get("aiModel") || undefined,
      statusRekomendasi: searchParams.get("statusRekomendasi") || undefined,
      createdAt: searchParams.get("createdAt") || undefined,
      updatedAt: searchParams.get("updatedAt") || undefined,
      tanggal: searchParams.get("tanggal") || undefined,
    });

    if (!parsed.success) return handleZodValidation(parsed);
    const data = parsed.data;

    const buildDateRange = (dateStr?: string): { from?: Date; to?: Date } => {
      if (!dateStr || !dayjs(dateStr, "YYYY-MM-DD", true).isValid()) {
        return { from: undefined, to: undefined };
      }
      return {
        from: dayjs.tz(`${dateStr} 00:00:00`, "Asia/Jakarta").utc().toDate(),
        to: dayjs.tz(`${dateStr} 23:59:59`, "Asia/Jakarta").utc().toDate(),
      };
    };

    const createdAtRange = buildDateRange(data.createdAt);
    const updatedAtRange = buildDateRange(data.updatedAt);
    const tanggalRange = buildDateRange(data.tanggal);

    const result = await kegiatanRapatService.getAll({
      search: data.q,
      judul: data.judul,
      lokasi: data.lokasi,
      domainIsuId: data.domainIsuId,
      dibuatOlehId: data.dibuatOlehId,
      diprosesOlehId: data.diprosesOlehId,
      aiModel: data.aiModel,
      // mode dihapus dari sini
      statusRekomendasi: data.statusRekomendasi as
        | StatusRekomendasi
        | undefined,
      createdAtFrom: createdAtRange.from,
      createdAtTo: createdAtRange.to,
      updatedAtFrom: updatedAtRange.from,
      updatedAtTo: updatedAtRange.to,
      tanggalFrom: tanggalRange.from,
      tanggalTo: tanggalRange.to,
      role: session.user.role as Role,
      sortBy: (searchParams.get("sortBy") as any) || "updatedAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
    });

    if (result.data.length === 0) {
      return handleResponse({
        success: true,
        message: "Kegiatan Masih Kosong",
        data: [],
        meta: {
          total: 0,
          page: result.page,
          limit: result.limit,
          totalPages: 0,
        },
        status: 200,
      });
    }

    return handleResponse({
      success: true,
      message: "Data Berhasil Ditemukan",
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
    console.error("GET ALL ERROR:", err);
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
