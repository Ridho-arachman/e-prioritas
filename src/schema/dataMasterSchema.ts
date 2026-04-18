import { NilaiKritikalitas } from "@/app/generated/prisma";
import z from "zod";

// Schema untuk CREATE (semua field wajib kecuali yang nullable di Prisma)
export const dataMasterCreateSchema = z.object({
  domainIsuId: z.string().min(1, "Domain Isu ID diperlukan"), // Foreign key, tidak perlu .cuid() kecuali yakin semua ID pakai cuid

  namaAtribut: z
    .string()
    .trim()
    .min(1, "Nama atribut tidak boleh kosong")
    .max(100, "Maksimal 100 karakter"),

  kritikalitas: z.nativeEnum(NilaiKritikalitas, {
    message: "Nilai kritikalitas tidak valid",
  }),

  jumlah: z
    .number()
    .int("Jumlah harus bilangan bulat")
    .min(0, "Jumlah tidak boleh negatif")
    .nullable()
    .optional(),

  isActive: z.boolean().optional(), // Default true di Prisma

  tahunData: z
    .number()
    .int("Tahun data harus bilangan bulat")
    .nullable()
    .optional(),

  diprosesOlehId: z.string().nullable().optional(), // Nullable, validasi cuid opsional jika diperlukan
});

// Schema untuk UPDATE (semua field opsional)
export const dataMasterUpdateSchema = dataMasterCreateSchema.partial();

// Schema untuk query params
export const dataMasterQuerySchema = z.object({
  q: z.string().optional(),
  domainIsuId: z.string().optional(),
  kritikalitas: z.preprocess((val) => {
    if (typeof val !== "string") return undefined;
    const trimmed = val.trim();
    if (trimmed === "" || trimmed.toLowerCase() === "all") return undefined;
    return trimmed.toUpperCase();
  }, z.nativeEnum(NilaiKritikalitas).optional()),

  // ✅ Filter baru dengan penanganan null/undefined/empty string
  isActive: z.preprocess(
    (val) =>
      val === null || val === undefined || val === "" ? undefined : val,
    z.enum(["true", "false"]).optional(),
  ),
  diprosesOlehId: z.preprocess(
    (val) =>
      val === null || val === undefined || val === "" ? undefined : val,
    z.string().optional(),
  ),
  tahunData: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().int().optional()),
  createdAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Format tanggal harus YYYY-MM-DD",
    })
    .optional(),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Format tanggal harus YYYY-MM-DD",
    })
    .optional(),

  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

// Schema untuk validasi ID di path parameter
export const dataMasterParamSchema = z.object({
  id: z.string().min(1, "ID diperlukan"),
});

// Schema untuk array (import bulk)
export const dataMasterArraySchema = z.array(dataMasterCreateSchema);
