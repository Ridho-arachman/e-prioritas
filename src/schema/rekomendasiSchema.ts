import z from "zod";

export const postRekomendasiSchema = z.object({
  judulLaporan: z
    .string("Judul laporan harus teks")
    .trim()
    .min(1, "Judul laporan tidak boleh kosong")
    .max(255, "Judul laporan maksimal 255 karakter"),
});

export const queryRekomendasiSchema = z.object({
  judulLaporan: z
    .string("Judul laporan harus teks")
    .trim()
    .max(255, "Judul laporan maksimal 255 karakter")
    .optional(),
});

export const rekomendasiByIdSchema = z.object({
  id: z
    .cuid("Id rekomendasi tidak valid")
    .trim()
    .min(1, "Id rekomendasi tidak valid"),
});
