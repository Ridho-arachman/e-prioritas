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
import { geminiAi } from "@/lib/gemini";
import prisma from "@/lib/prisma";
import { createHash } from "crypto";
import * as levenshtein from "fast-levenshtein"; // ✅ tambahan

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
  diprosesOlehId?: string;
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

export type RekomendasiItem = {
  prioritasKe: number;
  deskripsi: string;
  skorPrioritas: number;
  alasanAnalisis: string;
  domainIsuId: string;
  lokasi?: string;
  fingerprint: string;
  evidence?: {
    masukanWargaCount?: number;
    dataMasterCount?: number;
    kritikalitas?: "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH";
  };
  usedMasukanIds?: string[];
  usedDataMasterIds?: string[];
  warning?: string | null;
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
      lokasi: string;
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

  getAll: async (params?: KegiatanRapatGetAllParams) => {
    const {
      judul,
      lokasi,
      domainIsuId,
      dibuatOlehId,
      diprosesOlehId,
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
    if (diprosesOlehId) where.diprosesOlehId = diprosesOlehId;
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
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

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
                lokasi: true,
                warga: { select: { nama: true } },
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

  deleteById: async (id: string) => {
    return prisma.kegiatanRapat.delete({ where: { id } });
  },

  getMasukanTerkait: async (kegiatanRapatId: string) => {
    return prisma.kegiatanRapatMasukan.findMany({
      where: { kegiatanRapatId },
      include: {
        masukan: {
          select: {
            id: true,
            judul: true,
            deskripsi: true,
            lokasi: true,
            warga: { select: { nama: true } },
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

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
        where: { domainIsuId, status: StatusMasukan.DIVERIFIKASI },
        select: {
          id: true,
          judul: true,
          deskripsi: true,
          lokasi: true,
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

    // 2. Fetch exclusion titles (prioritas kegiatan rapat lain)
    const existingPrioritas = await prisma.kegiatanRapat.findMany({
      where: {
        domainIsuId,
        id: { not: kegiatanRapatId },
        statusRekomendasi: { in: ["DIAJUKAN", "DISETUJUI"] },
      },
      select: { rekomendasiItems: true },
    });

    // 3. Fetch program kelurahan (termasuk deskripsi untuk running program)
    const programs = await prisma.programKelurahan.findMany({
      where: { domainIsuId, status: { in: ["BERJALAN", "SELESAI"] } },
      select: {
        judul: true,
        status: true,
        lokasi: true,
        tanggalSelesai: true,
        deskripsi: true,
      },
    });

    // 3a. Siapkan data untuk program yang sedang BERJALAN (untuk diinformasikan ke AI)
    const runningPrograms = programs
      .filter((p) => p.status === "BERJALAN")
      .map((p) => ({
        judul: p.judul,
        deskripsi: p.deskripsi || "",
        lokasi: p.lokasi || "Tidak ditentukan",
      }));

    // 3b. Siapkan data untuk warning (program berjalan dan selesai dalam 21 hari)
    const WARNING_DAYS = 21;
    const today = new Date();
    const warningPrograms = programs
      .filter((prog) => {
        if (prog.status === "BERJALAN") return true;
        if (prog.status === "SELESAI" && prog.tanggalSelesai) {
          const daysSince =
            (today.getTime() - new Date(prog.tanggalSelesai).getTime()) /
            (1000 * 3600 * 24);
          return daysSince <= WARNING_DAYS;
        }
        return false;
      })
      .map((prog) => ({
        judul: prog.judul,
        judulLower: prog.judul.toLowerCase(),
        status: prog.status,
        tanggalSelesai: prog.tanggalSelesai,
      }));

    // 4. Filter masukan warga berdasarkan program berjalan yang memiliki lokasi
    let filteredMasukanWarga = [...masukanWarga];
    const programBerjalanDenganLokasi = programs.filter(
      (p) => p.status === "BERJALAN" && p.lokasi && p.lokasi.trim() !== "",
    );
    for (const prog of programBerjalanDenganLokasi) {
      filteredMasukanWarga = filteredMasukanWarga.filter(
        (m) => m.lokasi !== prog.lokasi,
      );
    }

    // 5. Buat exclusion titles dari program berjalan (tanpa lokasi) dan program selesai tanpa masukan relevan
    let programExclusionTitles: string[] = [];
    for (const program of programs) {
      if (program.status === "BERJALAN") {
        if (!program.lokasi) {
          programExclusionTitles.push(program.judul);
        }
      } else if (program.status === "SELESAI") {
        const hasRelatedMasukan = filteredMasukanWarga.some((m) => {
          const matchJudul =
            m.judul.toLowerCase().includes(program.judul.toLowerCase()) ||
            program.judul.toLowerCase().includes(m.judul.toLowerCase());
          const matchLokasi =
            !program.lokasi ||
            (m.lokasi &&
              (m.lokasi.toLowerCase().includes(program.lokasi.toLowerCase()) ||
                program.lokasi.toLowerCase().includes(m.lokasi.toLowerCase())));
          return matchJudul && matchLokasi;
        });
        if (!hasRelatedMasukan) {
          programExclusionTitles.push(program.judul);
        }
      }
    }

    const exclusionTitles = [
      ...programExclusionTitles,
      ...existingPrioritas.flatMap((r) => {
        try {
          const parsed = r.rekomendasiItems as any;
          return parsed?.prioritas?.map((p: any) => p.deskripsi) || [];
        } catch {
          return [];
        }
      }),
    ]
      .filter(Boolean)
      .slice(0, 10);

    // 6. Transform data untuk prompt
    const masukanInput: MasukanWargaInput[] = filteredMasukanWarga.map((m) => ({
      id: m.id,
      judul: m.judul,
      deskripsi: m.deskripsi,
      lokasi: m.lokasi,
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

    // 7. Build prompt dengan tambahan runningPrograms
    const prompt = buildPrompt({
      mode,
      judulLaporan,
      domainIsuCode,
      domainIsuId,
      masukanWarga: masukanInput,
      dataMaster: dataMasterInput,
      exclusionTitles,
      runningPrograms,
    });

    const aiResponse = await geminiAi(prompt);

    // 8. Adaptasi lokasi (jika AI masih mengirim lokasiRt/lokasiRw)
    const adaptedPrioritas = (aiResponse.prioritas as any[]).map(
      (item: any) => {
        if (item.lokasi) return item;
        const rt = item.lokasiRt ? `RT ${item.lokasiRt}` : "";
        const rw = item.lokasiRw ? `RW ${item.lokasiRw}` : "";
        const lokasi = [rt, rw].filter(Boolean).join(" / ");
        return { ...item, lokasi };
      },
    );

    // 9. Urutkan data untuk alokasi evidence
    const sortedMasukan = [...masukanInput].sort((a, b) =>
      a.id.localeCompare(b.id),
    );
    const sortedDataMaster = [...dataMasterInput].sort((a, b) =>
      a.id.localeCompare(b.id),
    );

    let masukanIndex = 0;
    let dataMasterIndex = 0;

    // 10. Proses setiap prioritas: alokasi evidence dan tambahkan warning
    const processedPrioritas = adaptedPrioritas.map((item, idx) => {
      const masukanCount = item.evidence?.masukanWargaCount || 0;
      const dataMasterCount = item.evidence?.dataMasterCount || 0;
      const usedMasukanIds = sortedMasukan
        .slice(masukanIndex, masukanIndex + masukanCount)
        .map((m) => m.id);
      masukanIndex += masukanCount;
      const usedDataMasterIds = sortedDataMaster
        .slice(dataMasterIndex, dataMasterIndex + dataMasterCount)
        .map((d) => d.id);
      dataMasterIndex += dataMasterCount;

      // 🔔 Deteksi warning dengan fast-levenshtein
      // 🔔 Deteksi warning dengan fast-levenshtein + kata kunci + includes
      let warningMessage: string | null = null;
      const deskripsiLower = item.deskripsi.toLowerCase();
      for (const prog of warningPrograms) {
        // Hitung similarity Levenshtein
        const distance = levenshtein.get(deskripsiLower, prog.judulLower);
        const maxLen = Math.max(deskripsiLower.length, prog.judulLower.length);
        const similarity = maxLen === 0 ? 1 : 1 - distance / maxLen;

        // Cek kata kunci: apakah salah satu kata dari judul program (min 3 huruf) muncul di deskripsi?
        const wordsInJudul = prog.judulLower.split(/\s+/);
        const matchKeyword = wordsInJudul.some(
          (word) => word.length >= 3 && deskripsiLower.includes(word),
        );

        if (
          similarity >= 0.35 ||
          matchKeyword ||
          deskripsiLower.includes(prog.judulLower) ||
          prog.judulLower.includes(deskripsiLower)
        ) {
          const statusText =
            prog.status === "BERJALAN" ? "sedang berjalan" : "telah selesai";
          let daysInfo = "";
          if (prog.status === "SELESAI" && prog.tanggalSelesai) {
            const daysSince = Math.floor(
              (today.getTime() - new Date(prog.tanggalSelesai).getTime()) /
                (1000 * 3600 * 24),
            );
            daysInfo = ` (selesai ${daysSince} hari yang lalu, masa peringatan ${WARNING_DAYS} hari)`;
          }
          warningMessage = `⚠️ Program serupa dengan judul "${prog.judul}" (${statusText}${daysInfo}). Perhatikan data terbaru.`;
          break;
        }
      }

      return {
        ...item,
        prioritasKe: idx + 1,
        fingerprint:
          item.fingerprint?.trim() ||
          generateFingerprint(`${kegiatanRapatId}-${idx}-${Date.now()}`),
        domainIsuId: item.domainIsuId || domainIsuId,
        lokasi: item.lokasi || null,
        evidence: {
          masukanWargaCount: masukanCount,
          dataMasterCount: dataMasterCount,
          kritikalitas: item.evidence?.kritikalitas ?? "SEDANG",
        },
        usedMasukanIds,
        usedDataMasterIds,
        warning: warningMessage,
      };
    });

    // 11. Bentuk final rekomendasi
    const finalRekomendasi = {
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
          lokasi: m.lokasi,
        })),
        dataMaster: dataMasterInput.slice(0, 10).map((d) => ({
          id: d.id,
          namaAtribut: d.namaAtribut,
          kritikalitas: d.kritikalitas,
          jumlah: d.jumlah,
        })),
      },
    };

    // 12. Simpan ke database dalam transaksi
    const updated = await prisma.$transaction(async (tx) => {
      await tx.kegiatanRapatMasukan.deleteMany({ where: { kegiatanRapatId } });
      await tx.kegiatanRapatDataMaster.deleteMany({
        where: { kegiatanRapatId },
      });
      if (mode === "FUSI_DATA" && masukanWarga.length > 0) {
        await tx.kegiatanRapatMasukan.createMany({
          data: masukanWarga.map((m) => ({
            kegiatanRapatId,
            masukanId: m.id,
          })),
          skipDuplicates: true,
        });
      }
      if (dataMaster.length > 0) {
        await tx.kegiatanRapatDataMaster.createMany({
          data: dataMaster.map((d) => ({
            kegiatanRapatId,
            dataMasterId: d.id,
          })),
          skipDuplicates: true,
        });
      }
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
