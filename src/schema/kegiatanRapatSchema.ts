import { z } from "zod";
import { ModeRekomendasi, StatusRekomendasi } from "@/app/generated/prisma";

// Schema untuk CREATE/UPDATE KegiatanRapat
export const kegiatanRapatSchema = z.object({
  // ✅ Required fields (sesuai schema Prisma)
  judul: z.string().trim().min(1, "Judul wajib diisi").max(255),
  deskripsi: z.string().trim().min(1, "Deskripsi wajib diisi"),
  tanggal: z.union([
    z.date(),
    z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, "Format ISO 8601"),
  ]),
  domainIsuId: z.string().cuid("Domain Isu ID tidak valid"), // ✅ Required, tidak nullable
  dibuatOlehId: z.string().cuid("User ID tidak valid"), // ✅ Required

  // ✅ Enum fields
  mode: z.nativeEnum(ModeRekomendasi, {
    message: "Mode rekomendasi tidak valid",
  }),
  statusRekomendasi: z
    .nativeEnum(StatusRekomendasi, { message: "Status tidak valid" })
    .optional()
    .default("DRAFT"),

  // ✅ Optional fields (nullable di schema)
  lokasi: z.string().trim().max(100).nullable().optional(),
  judulLaporan: z.string().trim().max(255).optional(),

  // ✅ JSON field untuk rekomendasi (validasi struktural opsional)
  rekomendasiItems: z.any().optional(), // Atau z.object({...}) jika mau strict

  // ✅ AI Metadata
  aiModel: z.string().trim().nullable().optional(),
  aiProcessedAt: z.union([z.date(), z.string()]).nullable().optional(),

  // ✅ Fingerprint (biasanya auto-generated, tapi bisa di-override untuk testing)
  fingerprint: z
    .string()
    .trim()
    .length(16, "Fingerprint harus 16 karakter hex")
    .optional(),

  // ✅ For approval workflow
  diprosesOlehId: z.string().cuid().nullable().optional(),
});

// Schema untuk QUERY/FILTER (lebih fleksibel)
export const kegiatanRapatQuerySchema = z.object({
  q: z.string().trim().optional(),
  judul: z.string().trim().optional(),
  domainIsuId: z.string().cuid().optional(),
  dibuatOlehId: z.string().cuid().optional(),
  statusRekomendasi: z.nativeEnum(StatusRekomendasi).optional(),
  mode: z.nativeEnum(ModeRekomendasi).optional(),

  // Date range filters
  tanggalFrom: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  tanggalTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  createdAtFrom: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  createdAtTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),

  // Pagination
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(10),

  // Sorting
  sortBy: z
    .enum(["tanggal", "createdAt", "updatedAt", "judul"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Schema untuk PARAMS (by ID)
export const kegiatanRapatParamSchema = z.object({
  id: z.string().cuid("ID kegiatan rapat tidak valid"),
});

// Types for TypeScript inference
export type KegiatanRapatInput = z.infer<typeof kegiatanRapatSchema>;
export type KegiatanRapatQuery = z.infer<typeof kegiatanRapatQuerySchema>;
