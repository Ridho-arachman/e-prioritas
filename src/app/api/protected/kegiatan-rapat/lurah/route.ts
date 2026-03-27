// src/app/api/protected/kegiatan-rapat/route.ts
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { handleResponse } from "@/lib/handleResponse";
import {
  kegiatanRapatService,
  generateFingerprint,
} from "@/services/kegiatanRapatService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { NextRequest } from "next/server";
import {
  Role,
  StatusRekomendasi,
  ModeRekomendasi,
  Prisma,
} from "@/app/generated/prisma";
import { headers } from "next/headers";
import {
  kegiatanRapatQuerySchema,
  kegiatanRapatSchema,
} from "@/schema/kegiatanRapatSchema";
import prisma from "@/lib/prisma";

dayjs.extend(utc);
dayjs.extend(timezone);

// ========================
// POST - Create Kegiatan Rapat
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

    // Normalize tanggal ke Date object untuk Prisma
    const parsedTanggal = body.tanggal;
    let normalizedTanggal: Date | string = parsedTanggal;

    if (typeof parsedTanggal === "string") {
      if (
        parsedTanggal.endsWith("Z") ||
        parsedTanggal.includes("+") ||
        parsedTanggal.split("T")[1]?.includes("-")
      ) {
        normalizedTanggal = new Date(parsedTanggal);
      } else {
        normalizedTanggal = new Date(parsedTanggal);
      }
    }

    const fullBody = {
      ...body,
      tanggal: normalizedTanggal,
      dibuatOlehId: session.user.id,
    };

    const parsed = kegiatanRapatSchema.safeParse(fullBody);

    if (!parsed.success) return handleZodValidation(parsed);

    // 1. Create kegiatan rapat dulu
    const data = {
      ...parsed.data,
      dibuatOlehId: session.user.id,
      fingerprint:
        parsed.data.fingerprint ??
        generateFingerprint(
          `${parsed.data.domainIsuId}-${parsed.data.judul}-${Date.now()}`,
        ),
      rekomendasiItems: parsed.data.rekomendasiItems ?? {
        metadata: {
          generatedAt: new Date().toISOString(),
          aiModel: parsed.data.aiModel ?? "gemini-2.5-flash",
          modeRekomendasi: parsed.data.mode,
          domainIsuCode: parsed.data.domainIsuId,
          totalMasukanDianalisis: 0,
          totalDataMasterDianalisis: 0,
        },
        prioritas: [],
      },
      statusRekomendasi:
        parsed.data.statusRekomendasi ?? StatusRekomendasi.DRAFT,
    };

    const kegiatanRapat = await kegiatanRapatService.create(data);

    let finalData = kegiatanRapat; // default jika AI gagal

    // 2. Auto generate rekomendasi setelah create berhasil
    try {
      // Fetch domainIsu code untuk generateRekomendasi
      const domainIsu = await prisma.domainIsu.findUnique({
        where: { id: parsed.data.domainIsuId },
        select: { code: true },
      });

      if (domainIsu?.code) {
        // Trigger AI recommendation generation
        const result = await kegiatanRapatService.generateRekomendasi({
          kegiatanRapatId: kegiatanRapat.id,
          domainIsuId: parsed.data.domainIsuId,
          domainIsuCode: domainIsu.code,
          mode: parsed.data.mode,
          userId: session.user.id,
          judulLaporan: parsed.data.judulLaporan,
        });
        finalData = result.updated; // gunakan data yang sudah diupdate dengan rekomendasi
      }
    } catch (aiError) {
      // ⚠️ Jangan gagalkan request jika AI generation error
      console.error("AI Recommendation Generation Error:", aiError);
      // Tetap gunakan data awal (kegiatanRapat)
    }

    return handleResponse({
      success: true,
      message: "Kegiatan Berhasil Ditambahkan",
      data: finalData,
      status: 201,
    });
  } catch (err) {
    console.error("CREATE ERROR:", err);
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
// GET - List Kegiatan Rapat (tidak berubah)
// ========================

// src/app/api/protected/kegiatan-rapat/route.ts (bagian GET, menggunakan Prisma langsung)

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

    // Parse query parameters
    const q = searchParams.get("q") || undefined;
    const judul = searchParams.get("judul") || undefined;
    const lokasi = searchParams.get("lokasi") || undefined;
    const domainIsuId = searchParams.get("domainIsuId") || undefined;
    const aiModel = searchParams.get("aiModel") || undefined;
    const mode = searchParams.get("mode") as ModeRekomendasi | undefined;
    const statusRekomendasiParam = searchParams.get("statusRekomendasi") as
      | StatusRekomendasi
      | undefined;
    const createdAt = searchParams.get("createdAt") || undefined;
    const updatedAt = searchParams.get("updatedAt") || undefined;
    const tanggal = searchParams.get("tanggal") || undefined;
    const dibuatOlehIdParam = searchParams.get("dibuatOlehId") || undefined;
    const sortBy = (searchParams.get("sortBy") as string) || "updatedAt";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // 🔥 LOGIKA BERDASARKAN ROLE
    const role = session.user.role;
    let finalStatusRekomendasi = statusRekomendasiParam;
    let finalDibuatOlehId = dibuatOlehIdParam;

    if (role === "LURAH" && !finalStatusRekomendasi) {
      finalStatusRekomendasi = StatusRekomendasi.DIAJUKAN;
    }
    if (role === "PERANGKAT_DESA" && !finalDibuatOlehId) {
      finalDibuatOlehId = session.user.id;
    }

    // Helper untuk date range
    const buildDateRange = (dateStr?: string): { from?: Date; to?: Date } => {
      if (!dateStr || !dayjs(dateStr, "YYYY-MM-DD", true).isValid()) {
        return { from: undefined, to: undefined };
      }
      return {
        from: dayjs.tz(`${dateStr} 00:00:00`, "Asia/Jakarta").utc().toDate(),
        to: dayjs.tz(`${dateStr} 23:59:59`, "Asia/Jakarta").utc().toDate(),
      };
    };

    const createdAtRange = buildDateRange(createdAt);
    const updatedAtRange = buildDateRange(updatedAt);
    const tanggalRange = buildDateRange(tanggal);

    // Build where clause
    const where: Prisma.KegiatanRapatWhereInput = {};

    if (finalDibuatOlehId) {
      where.dibuatOlehId = finalDibuatOlehId;
    }
    if (judul) where.judul = { contains: judul, mode: "insensitive" };
    if (lokasi) where.lokasi = { contains: lokasi, mode: "insensitive" };
    if (domainIsuId) where.domainIsuId = domainIsuId;
    if (aiModel) where.aiModel = { contains: aiModel, mode: "insensitive" };
    if (mode) where.mode = mode;
    if (finalStatusRekomendasi)
      where.statusRekomendasi = finalStatusRekomendasi;

    if (createdAtRange.from || createdAtRange.to) {
      where.createdAt = {};
      if (createdAtRange.from) where.createdAt.gte = createdAtRange.from;
      if (createdAtRange.to) where.createdAt.lte = createdAtRange.to;
    }
    if (updatedAtRange.from || updatedAtRange.to) {
      where.updatedAt = {};
      if (updatedAtRange.from) where.updatedAt.gte = updatedAtRange.from;
      if (updatedAtRange.to) where.updatedAt.lte = updatedAtRange.to;
    }
    if (tanggalRange.from || tanggalRange.to) {
      where.tanggal = {};
      if (tanggalRange.from) where.tanggal.gte = tanggalRange.from;
      if (tanggalRange.to) where.tanggal.lte = tanggalRange.to;
    }

    if (q) {
      where.OR = [
        { judul: { contains: q, mode: "insensitive" } },
        { deskripsi: { contains: q, mode: "insensitive" } },
        { lokasi: { contains: q, mode: "insensitive" } },
      ];
    }

    // Sorting validation
    const validSortFields: Array<
      keyof Prisma.KegiatanRapatOrderByWithRelationInput
    > = ["judul", "tanggal", "createdAt", "updatedAt", "statusRekomendasi"];
    const safeSortBy = validSortFields.includes(sortBy as any)
      ? (sortBy as keyof Prisma.KegiatanRapatOrderByWithRelationInput)
      : "updatedAt";
    const orderBy: Prisma.KegiatanRapatOrderByWithRelationInput = {
      [safeSortBy]: sortOrder,
    };

    const skip = (page - 1) * limit;

    // Query langsung dengan Prisma
    const [data, total] = await prisma.$transaction([
      prisma.kegiatanRapat.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          dibuatOleh: { select: { name: true, jabatan: true } },
          domainIsu: { select: { nama: true, code: true } },
        },
      }),
      prisma.kegiatanRapat.count({ where }),
    ]);

    if (data.length === 0) {
      return handleResponse({
        success: true,
        message: "Kegiatan Masih Kosong",
        data: [],
        meta: {
          total: 0,
          page,
          limit,
          totalPages: 0,
        },
        status: 200,
      });
    }

    return handleResponse({
      success: true,
      message: "Data Berhasil Ditemukan",
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
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
