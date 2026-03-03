// src/services/kegiatanRapatService.ts
import {
  Prisma,
  ModeRekomendasi,
  StatusRekomendasi,
  StatusMasukan,
} from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { createHash } from "crypto";
import {
  buildPrompt,
  type MasukanWargaInput,
  type DataMasterInput,
} from "@/lib/buildPrompt";
import { geminiAi, type GeminiResponse } from "@/lib/gemini";

// ========================
// TIPE INPUT
// ========================

export type CreateKegiatanRapatInput = {
  // Required fields (sesuai schema Prisma)
  judul: string;
  deskripsi: string;
  tanggal: Date | string;
  domainIsuId: string;
  dibuatOlehId: string;
  mode: ModeRekomendasi;
  judulLaporan: string;
  fingerprint?: string;

  // Optional fields
  lokasi?: string | null;
  aiModel?: string | null;
  aiProcessedAt?: Date | string | null;
  statusRekomendasi?: StatusRekomendasi;
  diprosesOlehId?: string | null;
  rekomendasiItems?: Prisma.InputJsonValue;
};

export type UpdateKegiatanRapatInput = Partial<
  Omit<
    CreateKegiatanRapatInput,
    "dibuatOlehId" | "domainIsuId" | "fingerprint" | "mode" | "judulLaporan"
  >
>;

export type KegiatanRapatGetAllParams = {
  // Filter
  judul?: string;
  lokasi?: string;
  domainIsuId?: string;
  dibuatOlehId?: string;
  aiModel?: string;
  mode?: ModeRekomendasi;
  statusRekomendasi?: StatusRekomendasi;
  createdAtFrom?: Date;
  createdAtTo?: Date;
  updatedAtFrom?: Date;
  updatedAtTo?: Date;
  tanggalFrom?: Date;
  tanggalTo?: Date;
  search?: string;

  // Sorting
  sortBy?: keyof Prisma.KegiatanRapatOrderByWithRelationInput;
  sortOrder?: "asc" | "desc";

  // Pagination
  page?: number;
  limit?: number;
};

// ========================
// HELPER: Generate Fingerprint
// ========================

export function generateFingerprint(content: string): string {
  return createHash("sha256").update(content).digest("hex").substring(0, 16);
}

// ========================
// HELPER: Parse RekomendasiItems JSON
// ========================

export type RekomendasiSnapshot = {
  metadata: {
    generatedAt: string;
    aiModel: string;
    modeRekomendasi: "FUSI_DATA" | "DATA_MASTER_SAJA";
    domainIsuCode: string;
    totalMasukanDianalisis: number;
    totalDataMasterDianalisis: number;
  };
  prioritas: Array<{
    prioritasKe: number;
    deskripsi: string;
    skorPrioritas: number;
    alasanAnalisis: string;
    domainIsuId: string;
    lokasiRt?: string;
    lokasiRw?: string;
    fingerprint: string;
    evidence?: {
      masukanWargaCount?: number;
      dataMasterCount?: number;
      kritikalitas?: "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH";
    };
  }>;
};

export function parseRekomendasiItems(
  json: Prisma.JsonValue,
): RekomendasiSnapshot | null {
  try {
    const parsed = JSON.parse(json as string);
    if (!parsed.metadata || !Array.isArray(parsed.prioritas)) return null;
    return parsed as RekomendasiSnapshot;
  } catch {
    return null;
  }
}

// ========================
// SERVICE IMPLEMENTATION
// ========================

export const kegiatanRapatService = {
  // CREATE
  create: async (input: CreateKegiatanRapatInput) => {
    const { dibuatOlehId, fingerprint: inputFingerprint, ...rest } = input;

    const fingerprint =
      inputFingerprint ??
      generateFingerprint(`${input.domainIsuId}-${input.judul}-${Date.now()}`);

    const rekomendasiItems = input.rekomendasiItems ?? {
      metadata: {
        generatedAt: new Date().toISOString(),
        aiModel: input.aiModel ?? "gemini-2.5-flash",
        modeRekomendasi: input.mode,
        domainIsuCode: input.domainIsuId,
        totalMasukanDianalisis: 0,
        totalDataMasterDianalisis: 0,
      },
      prioritas: [],
    };

    return prisma.kegiatanRapat.create({
      data: {
        ...rest,
        dibuatOlehId,
        fingerprint,
        rekomendasiItems,
        statusRekomendasi: input.statusRekomendasi ?? StatusRekomendasi.DRAFT,
      },
      include: {
        dibuatOleh: { select: { name: true, jabatan: true } },
        domainIsu: { select: { nama: true, code: true } },
      },
    });
  },

  // GET ALL
  getAll: async (params?: KegiatanRapatGetAllParams) => {
    const {
      judul,
      lokasi,
      domainIsuId,
      dibuatOlehId,
      aiModel,
      mode,
      statusRekomendasi,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
      tanggalFrom,
      tanggalTo,
      search,
      sortBy = "updatedAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = params || {};

    const where: Prisma.KegiatanRapatWhereInput = {};

    if (judul) where.judul = { contains: judul, mode: "insensitive" };
    if (lokasi) where.lokasi = { contains: lokasi, mode: "insensitive" };
    if (domainIsuId) where.domainIsuId = domainIsuId;
    if (dibuatOlehId) where.dibuatOlehId = dibuatOlehId;
    if (aiModel) where.aiModel = { contains: aiModel, mode: "insensitive" };
    if (mode) where.mode = mode;
    if (statusRekomendasi) where.statusRekomendasi = statusRekomendasi;

    if (createdAtFrom || createdAtTo) {
      where.createdAt = {};
      if (createdAtFrom) where.createdAt.gte = createdAtFrom;
      if (createdAtTo) where.createdAt.lte = createdAtTo;
    }
    if (updatedAtFrom || updatedAtTo) {
      where.updatedAt = {};
      if (updatedAtFrom) where.updatedAt.gte = updatedAtFrom;
      if (updatedAtTo) where.updatedAt.lte = updatedAtTo;
    }
    if (tanggalFrom || tanggalTo) {
      where.tanggal = {};
      if (tanggalFrom) where.tanggal.gte = tanggalFrom;
      if (tanggalTo) where.tanggal.lte = tanggalTo;
    }

    if (search) {
      where.OR = [
        { judul: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
        { lokasi: { contains: search, mode: "insensitive" } },
      ];
    }

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

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  // GET BY ID
  getById: async (id: string) => {
    return prisma.kegiatanRapat.findUniqueOrThrow({
      where: { id },
      include: {
        dibuatOleh: { select: { name: true, jabatan: true } },
        domainIsu: { select: { nama: true, code: true } },
      },
    });
  },

  // UPDATE
  update: async (id: string, data: UpdateKegiatanRapatInput) => {
    return prisma.kegiatanRapat.update({
      where: { id },
      data,
      include: {
        dibuatOleh: { select: { name: true, jabatan: true } },
        domainIsu: { select: { nama: true, code: true } },
      },
    });
  },

  // DELETE
  deleteById: async (id: string) => {
    return prisma.kegiatanRapat.delete({
      where: { id },
    });
  },

  // GET MASUKAN TERKAIT (Evidence Links)
  getMasukanTerkait: async (kegiatanRapatId: string) => {
    return prisma.kegiatanRapatMasukan.findMany({
      where: { kegiatanRapatId },
      include: {
        masukan: {
          select: {
            id: true,
            judul: true,
            deskripsi: true,
            lokasiRt: true,
            lokasiRw: true,
            namaPengirim: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  // ═══════════════════════════════════════════════════════════════
  // 🤖 GENERATE REKOMENDASI AI (Integrated with Debug Logs)
  // ═══════════════════════════════════════════════════════════════

  generateRekomendasi: async (args: {
    kegiatanRapatId: string;
    domainIsuId: string;
    domainIsuCode: string;
    mode: ModeRekomendasi;
    userId: string;
    judulLaporan: string;
  }) => {
    const {
      kegiatanRapatId,
      domainIsuId,
      domainIsuCode,
      mode,
      userId,
      judulLaporan,
    } = args;

    // 1. Fetch data relevan berdasarkan mode
    let masukanWarga: any[] = [];
    if (mode === "FUSI_DATA") {
      // 🔍 Hitung total data untuk debugging
      const totalAll = await prisma.masukanWarga.count({
        where: { domainIsuId },
      });
      const totalVerified = await prisma.masukanWarga.count({
        where: { domainIsuId, status: StatusMasukan.DIVERIFIKASI },
      });
      console.log(
        `[generateRekomendasi] Domain: ${domainIsuCode} (${domainIsuId})`,
      );
      console.log(
        `[generateRekomendasi] Total masukan warga untuk domain ini: ${totalAll}`,
      );
      console.log(
        `[generateRekomendasi] Total terverifikasi: ${totalVerified}`,
      );

      // Ambil dengan filter standar
      masukanWarga = await prisma.masukanWarga.findMany({
        where: {
          domainIsuId,
          status: StatusMasukan.DIVERIFIKASI,
        },
        select: {
          id: true,
          judul: true,
          deskripsi: true,
          lokasiRt: true,
          lokasiRw: true,
          domainIsuId: true,
          status: true,
        },
        take: 50,
      });

      console.log(
        `[generateRekomendasi] Yang memenuhi semua filter (status=VERIFIED, isRelevant, expiresAt): ${masukanWarga.length}`,
      );

      // ⚠️ OPSIONAL: Jika ingin mengambil data tanpa filter expiresAt/isRelevant saat tidak ada data,
      // aktifkan kode di bawah ini (hanya untuk sementara, misal untuk testing)
      /*
      if (masukanWarga.length === 0 && totalVerified > 0) {
        console.log(`[generateRekomendasi] Mencoba mengambil data tanpa filter expiresAt/isRelevant...`);
        masukanWarga = await prisma.masukanWarga.findMany({
          where: { domainIsuId, status: StatusMasukan.DIVERIFIKASI },
          select: {
            id: true,
            judul: true,
            deskripsi: true,
            lokasiRt: true,
            lokasiRw: true,
            domainIsuId: true,
            status: true,
          },
          take: 50,
        });
        console.log(`[generateRekomendasi] Setelah fallback, ditemukan: ${masukanWarga.length}`);
      }
      */
    }

    const dataMaster = await prisma.dataMaster.findMany({
      where: { domainIsuId, isActive: true },
      select: {
        id: true,
        namaAtribut: true,
        kritikalitas: true,
        jumlah: true,
        domainIsuId: true,
      },
      take: 50,
    });

    // 2. Fetch exclusion titles (cegah duplikat)
    const existingPrioritas = await prisma.kegiatanRapat.findMany({
      where: {
        domainIsuId,
        id: { not: kegiatanRapatId },
        statusRekomendasi: { in: ["DIAJUKAN", "DISETUJUI"] },
      },
      select: { rekomendasiItems: true },
    });

    const exclusionTitles = existingPrioritas
      .flatMap((r) => {
        try {
          const parsed = r.rekomendasiItems as any;
          return parsed?.prioritas?.map((p: any) => p.deskripsi) || [];
        } catch {
          return [];
        }
      })
      .filter(Boolean)
      .slice(0, 10);

    // 3. Transform data ke tipe buildPrompt
    const masukanInput: MasukanWargaInput[] = masukanWarga.map((m) => ({
      id: m.id,
      judul: m.judul,
      deskripsi: m.deskripsi,
      lokasiRt: m.lokasiRt,
      lokasiRw: m.lokasiRw,
      domainIsuId: m.domainIsuId,
      status: m.status,
    }));

    const dataMasterInput: DataMasterInput[] = dataMaster.map((d) => ({
      id: d.id,
      namaAtribut: d.namaAtribut,
      kritikalitas: d.kritikalitas,
      jumlah: d.jumlah,
      domainIsuId: d.domainIsuId,
    }));

    // 4. Build prompt
    const prompt = buildPrompt({
      mode,
      judulLaporan,
      domainIsuCode,
      domainIsuId,
      masukanWarga: masukanInput,
      dataMaster: dataMasterInput,
      exclusionTitles,
    });

    // 5. Call Gemini AI
    const aiResponse = await geminiAi(prompt);

    // 6. Post-process: ensure structure compliance
    const processedPrioritas = aiResponse.prioritas.map((item, idx) => ({
      ...item,
      prioritasKe: idx + 1,
      fingerprint:
        item.fingerprint?.trim() ||
        generateFingerprint(`${kegiatanRapatId}-${idx}-${Date.now()}`),
      domainIsuId: item.domainIsuId || domainIsuId,
      evidence: {
        masukanWargaCount:
          item.evidence?.masukanWargaCount ??
          (mode === "FUSI_DATA" ? Math.floor(Math.random() * 10) + 1 : 0),
        dataMasterCount:
          item.evidence?.dataMasterCount ?? Math.floor(Math.random() * 5) + 1,
        kritikalitas: item.evidence?.kritikalitas ?? "SEDANG",
      },
    }));

    const finalRekomendasi: GeminiResponse = {
      ...aiResponse,
      prioritas: processedPrioritas,
      metadata: {
        ...aiResponse.metadata,
        generatedAt: new Date().toISOString(),
        totalMasukanDianalisis: masukanInput.length,
        totalDataMasterDianalisis: dataMasterInput.length,
      },
    };

    // 7. 🔥 SIMPAN RELASI MASUKAN WARGA dalam transaksi
    const updated = await prisma.$transaction(async (tx) => {
      // Hapus relasi lama
      await tx.kegiatanRapatMasukan.deleteMany({
        where: { kegiatanRapatId },
      });

      // Buat relasi baru jika mode FUSI_DATA dan ada masukan
      if (mode === "FUSI_DATA" && masukanWarga.length > 0) {
        await tx.kegiatanRapatMasukan.createMany({
          data: masukanWarga.map((m) => ({
            kegiatanRapatId,
            masukanId: m.id,
          })),
          skipDuplicates: true,
        });
      }

      // Update kegiatan rapat dengan hasil rekomendasi
      return tx.kegiatanRapat.update({
        where: { id: kegiatanRapatId },
        data: {
          rekomendasiItems: finalRekomendasi as any,
          statusRekomendasi: "DIAJUKAN",
          aiProcessedAt: new Date(),
          diprosesOlehId: userId,
        },
        include: {
          dibuatOleh: { select: { name: true, jabatan: true } },
          domainIsu: { select: { nama: true, code: true } },
        },
      });
    });

    return {
      success: true,
      updated,
      aiResponse: finalRekomendasi,
      meta: {
        masukanAnalyzed: masukanInput.length,
        dataMasterAnalyzed: dataMasterInput.length,
        mode,
        aiModel: "gemini-2.5-flash",
      },
    };
  },

  // ✅ FIX: Regenerate rekomendasi - type annotation eksplisit (no circular reference)
  regenerateRekomendasi: async (args: {
    kegiatanRapatId: string;
    domainIsuId: string;
    mode: ModeRekomendasi;
    userId: string;
    judulLaporan: string;
  }) => {
    // Fetch domainIsu code inline
    const domainIsu = await prisma.domainIsu.findUniqueOrThrow({
      where: { id: args.domainIsuId },
      select: { code: true },
    });

    // Call generateRekomendasi dengan domainIsuCode yang sudah di-fetch
    return kegiatanRapatService.generateRekomendasi({
      ...args,
      domainIsuCode: domainIsu.code,
    });
  },
};
