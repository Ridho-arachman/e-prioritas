import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";

import { kegiatanRapatService } from "@/services/kegiatanRapatService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { NextRequest } from "next/server";
import { Role } from "@/app/generated/prisma";
import { headers } from "next/headers";
import {
  kegiatanRapatQuerySchema,
  kegiatanRapatSchema,
} from "@/schema/kegiatanRapatSchema";

dayjs.extend(utc);
dayjs.extend(timezone);

// ========================
// POST - Create Kegiatan
// ========================

export const POST = async (req: NextRequest) => {
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
    const body = await req.json();
    const parsed = kegiatanRapatSchema.safeParse(body);

    if (!parsed.success) return handleZodValidation(parsed);

    // Gabungkan data validasi dengan ID user yang membuat
    const data = {
      ...parsed.data,
      dibuatOlehId: session.user.id, // akan digunakan untuk connect ke User
    };

    const kegiatanRapat = await kegiatanRapatService.create(data);

    return handleResponse({
      success: true,
      message: "Kegiatan Berhasil Ditambahkan",
      data: kegiatanRapat,
      status: 201,
    });
  } catch (err) {
    console.log(err);

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

// ========================
// GET - List Kegiatan
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

    // Parameter filter
    const q = searchParams.get("q") || undefined;
    const judul = searchParams.get("judul") || undefined;
    const lokasi = searchParams.get("lokasi") || undefined;
    const domainIsuId = searchParams.get("domainIsuId") || undefined;
    const aiModel = searchParams.get("aiModel") || undefined;
    const createdAt = searchParams.get("createdAt") || undefined;
    const updatedAt = searchParams.get("updatedAt") || undefined;
    const tanggal = searchParams.get("tanggal") || undefined;

    // Parameter sorting & pagination
    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // Validasi filter dengan schema
    const parsed = kegiatanRapatQuerySchema.safeParse({
      q,
      judul,
      lokasi,
      domainIsuId,
      aiModel,
      createdAt,
      updatedAt,
      tanggal,
    });

    if (!parsed.success) return handleZodValidation(parsed);

    const data = parsed.data;

    // Bangun filter tanggal
    let createdAtFrom: Date | undefined;
    let createdAtTo: Date | undefined;
    if (data.createdAt) {
      if (!dayjs(data.createdAt, "YYYY-MM-DD", true).isValid()) {
        return handleResponse({
          success: false,
          message: "Format tanggal createdAt tidak valid (harus YYYY-MM-DD)",
          status: 400,
        });
      }

      createdAtFrom = dayjs
        .tz(`${data.createdAt} 00:00:00`, "Asia/Jakarta")
        .utc()
        .toDate();
      createdAtTo = dayjs
        .tz(`${data.createdAt} 23:59:59`, "Asia/Jakarta")
        .utc()
        .toDate();
    }

    let updatedAtFrom: Date | undefined;
    let updatedAtTo: Date | undefined;
    if (data.updatedAt) {
      if (!dayjs(data.updatedAt, "YYYY-MM-DD", true).isValid()) {
        return handleResponse({
          success: false,
          message: "Format tanggal updatedAt tidak valid (harus YYYY-MM-DD)",
          status: 400,
        });
      }

      updatedAtFrom = dayjs
        .tz(`${data.updatedAt} 00:00:00`, "Asia/Jakarta")
        .utc()
        .toDate();
      updatedAtTo = dayjs
        .tz(`${data.updatedAt} 23:59:59`, "Asia/Jakarta")
        .utc()
        .toDate();
    }

    let tanggalFrom: Date | undefined;
    let tanggalTo: Date | undefined;
    if (data.tanggal) {
      if (!dayjs(data.tanggal, "YYYY-MM-DD", true).isValid()) {
        return handleResponse({
          success: false,
          message: "Format tanggal kegiatan tidak valid (harus YYYY-MM-DD)",
          status: 400,
        });
      }

      tanggalFrom = dayjs
        .tz(`${data.tanggal} 00:00:00`, "Asia/Jakarta")
        .utc()
        .toDate();
      tanggalTo = dayjs
        .tz(`${data.tanggal} 23:59:59`, "Asia/Jakarta")
        .utc()
        .toDate();
    }

    // Panggil service dengan semua parameter
    const result = await kegiatanRapatService.getAll({
      // Filter
      search: data.q,
      judul: data.judul,
      lokasi: data.lokasi,
      domainIsuId: data.domainIsuId,
      aiModel: data.aiModel,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
      tanggalFrom,
      tanggalTo,
      // Sorting
      sortBy,
      sortOrder,
      // Pagination
      page,
      limit,
    });

    if (result.data.length === 0) {
      return handleResponse({
        success: true,
        message: "Kegiatan Masih Kosong",
        data: [],
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
