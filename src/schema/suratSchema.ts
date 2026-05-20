import { z } from "zod";

export const createSuratSchema = z.object({
  nama: z.string().min(1, "Nama surat wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  ikon: z.string().min(1, "Ikon wajib dipilih"),
  persyaratan: z.array(z.string().min(1)).min(1, "Minimal 1 persyaratan"),
  linkForm: z.string().url("Link Google Form harus valid"),
  isActive: z.boolean().default(true),
});

export const updateSuratSchema = createSuratSchema.partial();

export const querySuratSchema = z.object({
  isActive: z.preprocess(
    (val) => (val === null ? undefined : val),
    z
      .string()
      .optional()
      .transform((val) => val === "true"),
  ),
  limit: z.preprocess(
    (val) => (val === null ? undefined : val),
    z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 100)),
  ),
  page: z.preprocess(
    (val) => (val === null ? undefined : val),
    z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 1)),
  ),
});
