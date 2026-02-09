import z from "zod";

export const kategoriSchema = z.object({
  code: z
    .string("Code harus teks")
    .trim()
    .min(1, "Code tidak boleh kosong")
    .max(50, "Code maksimal 50 karakter")
    .uppercase("Code harus huruf kapital"),
  nama: z
    .string("Nama kategori harus teks")
    .trim()
    .min(2, "Nama kategori tidak boleh kosong")
    .max(255, "Nama kategori maksimal 255 karakter"),
  deskripsi: z
    .string("Deskripsi harus berupa teks")
    .trim()
    .min(1, "Deskripsi tidak boleh kosong")
    .max(500, "Deskripsi maksimal 500 karakter"),
});

export const kategoriByIdSchema = z.object({
  id: z
    .cuid("Id kategori tidak valid")
    .trim()
    .min(1, "Id kategori tidak valid"),
});

export const kategoriQuerySchema = z.object({
  nama: z
    .string("Nama kategori harus teks")
    .max(255, "Nama kategori maksimal 255 karakter")
    .optional(),
});
