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

    // ✅ Normalize tanggal ke Date object untuk Prisma
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

    // ✅ 1. Create kegiatan rapat dulu
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

    // ✅ 2. Auto generate rekomendasi setelah create berhasil
    try {
      // Fetch domainIsu code untuk generateRekomendasi
      const domainIsu = await prisma.domainIsu.findUnique({
        where: { id: parsed.data.domainIsuId },
        select: { code: true },
      });

      if (domainIsu?.code) {
        // Trigger AI recommendation generation
        await kegiatanRapatService.generateRekomendasi({
          kegiatanRapatId: kegiatanRapat.id,
          domainIsuId: parsed.data.domainIsuId,
          domainIsuCode: domainIsu.code,
          mode: parsed.data.mode,
          userId: session.user.id,
          judulLaporan: parsed.data.judulLaporan,
        });
      }
    } catch (aiError) {
      // ⚠️ Jangan gagalkan request jika AI generation error
      // Log error dan lanjutkan response success
      console.error("AI Recommendation Generation Error:", aiError);
      // Optional: Bisa kirim notifikasi ke admin/log system
    }

    // ✅ 3. Fetch updated data dengan rekomendasi yang sudah digenerate
    const updatedKegiatan = await prisma.kegiatanRapat.findUnique({
      where: { id: kegiatanRapat.id },
      include: {
        dibuatOleh: { select: { name: true, jabatan: true } },
        domainIsu: { select: { nama: true, code: true } },
      },
    });

    return handleResponse({
      success: true,
      message: "Kegiatan Berhasil Ditambahkan & Rekomendasi AI Sedang Diproses",
      data: updatedKegiatan,
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
      aiModel: searchParams.get("aiModel") || undefined,
      mode: searchParams.get("mode") || undefined,
      statusRekomendasi: searchParams.get("statusRekomendasi") || undefined,
      createdAt: searchParams.get("createdAt") || undefined,
      updatedAt: searchParams.get("updatedAt") || undefined,
      tanggal: searchParams.get("tanggal") || undefined,
    });

    if (!parsed.success) return handleZodValidation(parsed);
    const data = parsed.data;

    // ✅ Date filters helper dengan type annotation eksplisit
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
      aiModel: data.aiModel,
      mode: data.mode as ModeRekomendasi | undefined,
      statusRekomendasi: data.statusRekomendasi as
        | StatusRekomendasi
        | undefined,
      createdAtFrom: createdAtRange.from,
      createdAtTo: createdAtRange.to,
      updatedAtFrom: updatedAtRange.from,
      updatedAtTo: updatedAtRange.to,
      tanggalFrom: tanggalRange.from,
      tanggalTo: tanggalRange.to,
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
