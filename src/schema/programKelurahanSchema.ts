import { StatusProgram } from "@/app/generated/prisma";
import { z } from "zod";

// Schema untuk form (semua field sebagai string untuk kompatibilitas input)
export const programKelurahanCreateSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi").max(255),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  status: z.nativeEnum(StatusProgram).default(StatusProgram.BERJALAN),
  tanggalMulai: z.string().optional().nullable(),
  tanggalSelesai: z.string().optional().nullable(),
  pic: z.string().max(100).optional().nullable(),
  domainIsuId: z.string().optional().nullable(),
});

// Type untuk form
export type ProgramKelurahanFormData = z.infer<
  typeof programKelurahanCreateSchema
>;

// Schema untuk update
export const programKelurahanUpdateSchema =
  programKelurahanCreateSchema.partial();

// Schema untuk query params
export const programKelurahanQuerySchema = z.object({
  q: z.string().optional(),
  status: z.nativeEnum(StatusProgram).optional(),
  domainIsuId: z.string().cuid().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z
    .enum(["judul", "status", "createdAt", "updatedAt", "tanggalMulai"])
    .default("updatedAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Schema untuk validasi ID
export const programKelurahanParamSchema = z.object({
  id: z.string().cuid(),
});
