import { StatusNoHPWarga } from "@/app/generated/prisma";
import { z } from "zod";

// Schema untuk form (tanpa default, agar tipe tidak ambigu)
export const wargaFormSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi").max(255),
  noHp: z.string().min(10, "Nomor HP minimal 10 digit").max(20),
  alamat: z.string().optional().nullable(),
});

export type WargaFormValues = z.infer<typeof wargaFormSchema>;

// Schema untuk create (dengan default)
export const wargaCreateSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi").max(255),
  noHp: z.string().min(10, "Nomor HP minimal 10 digit").max(20),
  alamat: z.string().optional().nullable(),
});

export const wargaUpdateSchema = wargaCreateSchema.partial();

export const wargaQuerySchema = z.object({
  q: z.string().optional(),
  statusNoHp: z.nativeEnum(StatusNoHPWarga).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z
    .enum(["nama", "noHp", "statusNoHp", "createdAt", "updatedAt"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const wargaParamSchema = z.object({
  id: z.string().cuid(),
});

export type WargaCreateInput = z.infer<typeof wargaCreateSchema>;
export type WargaUpdateInput = z.infer<typeof wargaUpdateSchema>;
