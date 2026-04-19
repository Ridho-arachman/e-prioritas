// src/schema/kegiatanRapatSchema.ts
import { ModeRekomendasi, StatusRekomendasi } from "@/app/generated/prisma";
import { z } from "zod";

// ═══════════════════════════════════════════════════════════════
// Schema untuk CREATE/UPDATE KegiatanRapat
// ═══════════════════════════════════════════════════════════════

export const kegiatanRapatSchema = z.object({
  // ✅ Required fields (sesuai schema Prisma)
  judul: z.string().trim().min(1, "Judul wajib diisi").max(255),
  deskripsi: z.string().trim().min(1, "Deskripsi wajib diisi"),
  tanggal: z
    .union([
      z.date(),
      z.string().refine((val) => {
        const d = new Date(val);
        return !isNaN(d.getTime());
      }, "Format tanggal tidak valid"),
    ])
    .transform((val) => {
      // Always return Date object for Prisma compatibility
      return val instanceof Date ? val : new Date(val);
    }),
  domainIsuId: z.string().cuid("Domain Isu ID tidak valid"),

  dibuatOlehId: z.string("Id Harus String"),

  mode: z.nativeEnum(ModeRekomendasi, {
    message: "Mode rekomendasi tidak valid",
  }),

  // ✅ FIX: judulLaporan REQUIRED (sesuai Prisma schema: String, bukan String?)
  judulLaporan: z.string().trim().min(1, "Judul laporan wajib diisi").max(255),

  // ✅ Optional fields (nullable di schema)
  lokasi: z.string().trim().max(100).nullable().optional(),

  // ✅ JSON field untuk rekomendasi
  rekomendasiItems: z.any().optional(),

  // ✅ AI Metadata
  aiModel: z.string().trim().nullable().optional(),
  aiProcessedAt: z.union([z.date(), z.string()]).nullable().optional(),

  // ✅ Fingerprint
  fingerprint: z
    .string()
    .trim()
    .length(16, "Fingerprint harus 16 karakter hex")
    .optional(),

  // ✅ Status & approval
  statusRekomendasi: z
    .nativeEnum(StatusRekomendasi, { message: "Status tidak valid" })
    .optional()
    .default(StatusRekomendasi.DRAFT), // ✅ Gunakan enum value, bukan string
  diprosesOlehId: z.string().nullable().optional(),
});

// ═══════════════════════════════════════════════════════════════
// Schema untuk QUERY/FILTER (sesuai dengan KegiatanRapatGetAllParams)
// ═══════════════════════════════════════════════════════════════

export const kegiatanRapatQuerySchema = z.object({
  // Text search
  q: z.string().trim().optional(),
  judul: z.string().trim().optional(),
  lokasi: z.string().trim().optional(),
  domainIsuId: z.string().optional(),
  dibuatOlehId: z.string().optional(),
  diprosesOlehId: z.string().optional(), // ✅ Tambahan
  aiModel: z.string().trim().optional(),
  mode: z.nativeEnum(ModeRekomendasi).optional(),
  statusRekomendasi: z.nativeEnum(StatusRekomendasi).optional(),

  // Date filters (single date, akan dikonversi jadi range)
  createdAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  tanggal: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),

  // Pagination
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),

  // Sorting
  sortBy: z
    .enum(["judul", "tanggal", "createdAt", "updatedAt", "statusRekomendasi"])
    .default("updatedAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// ═══════════════════════════════════════════════════════════════
// Schema untuk PARAMS (by ID)
// ═══════════════════════════════════════════════════════════════

export const kegiatanRapatParamSchema = z.object({
  id: z.string().cuid("ID kegiatan rapat tidak valid"),
});

// ═══════════════════════════════════════════════════════════════
// Types for TypeScript inference
// ═══════════════════════════════════════════════════════════════

export type KegiatanRapatInput = z.infer<typeof kegiatanRapatSchema>;
export type KegiatanRapatQuery = z.infer<typeof kegiatanRapatQuerySchema>;
