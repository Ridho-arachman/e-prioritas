// src/services/kegiatanRapatService.ts
import {
  ModeRekomendasi,
  Prisma,
  Role,
  StatusMasukan,
  StatusRekomendasi,
} from "@/app/generated/prisma";
import {
  buildPrompt,
  type DataMasterInput,
  type MasukanWargaInput,
} from "@/lib/buildPrompt";
import { geminiAi, type GeminiResponse } from "@/lib/gemini";
import prisma from "@/lib/prisma";
import { createHash } from "crypto";

// ========================
// TIPE INPUT
// ========================

export type CreateKegiatanRapatInput = {
  judul: string;
  deskripsi: string;
  tanggal: Date | string;
  domainIsuId: string;
  dibuatOlehId: string;
  mode: ModeRekomendasi;
  judulLaporan: string;
  fingerprint?: string;
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

interface KegiatanRapatGetAllParams {
  judul?: string;
  lokasi?: string;
  domainIsuId?: string;
  dibuatOlehId?: string;
  diprosesOlehId?: string; // ✅ Tambahan
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
  role?: Role;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// ========================
// HELPER: Generate Fingerprint
// ========================

export function generateFingerprint(content: string): string {
  return createHash("sha256").update(content).digest("hex").substring(0, 16);
}

// ========================
// HELPER: Parse RekomendasiItems JSON
// ========================

// Tipe RekomendasiItem yang diperbarui dengan field ID
export type RekomendasiItem = {
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
  usedMasukanIds?: string[]; // ID masukan warga yang terkait dengan prioritas ini
  usedDataMasterIds?: string[]; // ID data master yang terkait dengan prioritas ini
};

export type RekomendasiSnapshot = {
  metadata: {
    generatedAt: string;
    aiModel: string;
    modeRekomendasi: "FUSI_DATA" | "DATA_MASTER_SAJA";
    domainIsuCode: string;
    totalMasukanDianalisis: number;
    totalDataMasterDianalisis: number;
  };
  prioritas: RekomendasiItem[];
  inputData?: {
    masukan: Array<{
      id: string;
      judul: string;
      deskripsi: string;
      lokasiRt: string;
      lokasiRw: string;
    }>;
    dataMaster: Array<{
      id: string;
      namaAtribut: string;
      kritikalitas: "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH";
      jumlah: number | null;
    }>;
  };
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
      diprosesOlehId, // ✅ Tambahan
      aiModel,
      mode,
      role,
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

    if (dibuatOlehId) where.dibuatOlehId = dibuatOlehId;
    if (diprosesOlehId) where.diprosesOlehId = diprosesOlehId; // ✅ Tambahan

    if (role === "LURAH") {
      where.statusRekomendasi = { not: StatusRekomendasi.DRAFT };
    }

    if (judul) where.judul = { contains: judul, mode: "insensitive" };
    if (lokasi) where.lokasi = { contains: lokasi, mode: "insensitive" };
    if (domainIsuId) where.domainIsuId = domainIsuId;
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

  // GET BY ID (dengan include relasi data master)
  getById: async (id: string) => {
    return prisma.kegiatanRapat.findUniqueOrThrow({
      where: { id },
      include: {
        dibuatOleh: { select: { name: true, jabatan: true } },
        domainIsu: { select: { nama: true, code: true } },
        masukanRelasi: {
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
        },
        dataMasterRelasi: {
          include: {
            dataMaster: {
              select: {
                id: true,
                namaAtribut: true,
                kritikalitas: true,
                jumlah: true,
                tahunData: true,
              },
            },
          },
        },
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

  // GET MASUKAN TERKAIT
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
  // 🤖 GENERATE REKOMENDASI AI (dengan alokasi data berdasarkan evidence counts)
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

    // 1. Fetch data relevan
    let masukanWarga: any[] = [];
    if (mode === "FUSI_DATA") {
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

    // 2. Fetch exclusion titles
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

    // 3. Transform data
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

    // 6. Post-process: alokasi data berdasarkan evidence counts
    // Urutkan data agar alokasi konsisten (misal berdasarkan id)
    const sortedMasukan = [...masukanInput].sort((a, b) =>
      a.id.localeCompare(b.id),
    );
    const sortedDataMaster = [...dataMasterInput].sort((a, b) =>
      a.id.localeCompare(b.id),
    );

    let masukanIndex = 0;
    let dataMasterIndex = 0;

    const processedPrioritas = aiResponse.prioritas.map((item, idx) => {
      const masukanCount = item.evidence?.masukanWargaCount || 0;
      const dataMasterCount = item.evidence?.dataMasterCount || 0;

      // Ambil sejumlah masukan dari sortedMasukan sesuai count
      const usedMasukanIds = sortedMasukan
        .slice(masukanIndex, masukanIndex + masukanCount)
        .map((m) => m.id);
      masukanIndex += masukanCount;

      // Ambil sejumlah data master dari sortedDataMaster sesuai count
      const usedDataMasterIds = sortedDataMaster
        .slice(dataMasterIndex, dataMasterIndex + dataMasterCount)
        .map((d) => d.id);
      dataMasterIndex += dataMasterCount;

      return {
        ...item,
        prioritasKe: idx + 1,
        fingerprint:
          item.fingerprint?.trim() ||
          generateFingerprint(`${kegiatanRapatId}-${idx}-${Date.now()}`),
        domainIsuId: item.domainIsuId || domainIsuId,
        evidence: {
          masukanWargaCount: masukanCount,
          dataMasterCount: dataMasterCount,
          kritikalitas: item.evidence?.kritikalitas ?? "SEDANG",
        },
        usedMasukanIds,
        usedDataMasterIds,
      };
    });

    const finalRekomendasi: GeminiResponse & {
      prioritas: Array<RekomendasiItem>;
    } = {
      ...aiResponse,
      prioritas: processedPrioritas,
      metadata: {
        ...aiResponse.metadata,
        generatedAt: new Date().toISOString(),
        totalMasukanDianalisis: masukanInput.length,
        totalDataMasterDianalisis: dataMasterInput.length,
      },
      inputData: {
        masukan: masukanInput.slice(0, 10).map((m) => ({
          id: m.id,
          judul: m.judul,
          deskripsi:
            m.deskripsi?.substring(0, 100) +
            (m.deskripsi?.length > 100 ? "..." : ""),
          lokasiRt: m.lokasiRt,
          lokasiRw: m.lokasiRw,
        })),
        dataMaster: dataMasterInput.slice(0, 10).map((d) => ({
          id: d.id,
          namaAtribut: d.namaAtribut,
          kritikalitas: d.kritikalitas,
          jumlah: d.jumlah,
        })),
      },
    };

    // 7. Simpan relasi dalam transaksi
    const updated = await prisma.$transaction(async (tx) => {
      // Hapus relasi lama
      await tx.kegiatanRapatMasukan.deleteMany({
        where: { kegiatanRapatId },
      });
      await tx.kegiatanRapatDataMaster.deleteMany({
        where: { kegiatanRapatId },
      });

      // Buat relasi baru untuk masukan (jika mode FUSI_DATA)
      if (mode === "FUSI_DATA" && masukanWarga.length > 0) {
        await tx.kegiatanRapatMasukan.createMany({
          data: masukanWarga.map((m) => ({
            kegiatanRapatId,
            masukanId: m.id,
          })),
          skipDuplicates: true,
        });
      }

      // Buat relasi baru untuk data master (selalu disimpan)
      if (dataMaster.length > 0) {
        await tx.kegiatanRapatDataMaster.createMany({
          data: dataMaster.map((d) => ({
            kegiatanRapatId,
            dataMasterId: d.id,
          })),
          skipDuplicates: true,
        });
      }

      // Update kegiatan rapat
      return tx.kegiatanRapat.update({
        where: { id: kegiatanRapatId },
        data: {
          rekomendasiItems: finalRekomendasi as any,
          statusRekomendasi: "DRAFT",
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

  // ✅ Regenerate rekomendasi
  regenerateRekomendasi: async (args: {
    kegiatanRapatId: string;
    domainIsuId: string;
    mode: ModeRekomendasi;
    userId: string;
    judulLaporan: string;
  }) => {
    const domainIsu = await prisma.domainIsu.findUniqueOrThrow({
      where: { id: args.domainIsuId },
      select: { code: true },
    });

    return kegiatanRapatService.generateRekomendasi({
      ...args,
      domainIsuCode: domainIsu.code,
    });
  },
};
