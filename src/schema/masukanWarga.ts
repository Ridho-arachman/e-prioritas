import { MasukanStatus } from "@prisma/client";
import z from "zod";

export const createMasukanWargaSchema = z.object({
  namaPengirim: z
    .string("Nama pengirim harus teks")
    .trim()
    .min(1, "Nama pengirim tidak boleh kosong")
    .max(255, "Nama pengirim maksimal 255 karakter"),
  emailPengirim: z
    .string("Email pengirim harus teks")
    .trim()
    .email("Format email tidak valid"),
  lokasiRt: z
    .string("Lokasi RT harus teks")
    .trim()
    .min(1, "Lokasi RT tidak boleh kosong")
    .max(3, "Lokasi RT maksimal 3 karakter"),
  lokasiRw: z
    .string("Lokasi RW harus teks")
    .trim()
    .min(1, "Lokasi RW tidak boleh kosong")
    .max(3, "Lokasi RW maksimal 3 karakter"),
  deskripsiMasukan: z
    .string("Deskripsi masukan harus teks")
    .trim()
    .min(1, "Deskripsi masukan tidak boleh kosong"),
  kategoriId: z
    .string("Kategori id harus teks")
    .trim()
    .cuid("Kategori id tidak valid"),
});

export const editStatusMasukanWargaSchema = z.object({
  status: z.nativeEnum(MasukanStatus, { message: "Status tidak valid" }),
  verifiedByUserId: z
    .string("ID user wajib diisi")
    .trim()
    .cuid("ID user tidak valid"),
  alasanPenolakan: z
    .string("Alasan penolakan")
    .trim()
    .min(1, "Alasan penolakan tidak boleh kosong")
    .optional(),
});

export const masukanWargaByIdSchema = z.object({
  id: z
    .string("Id kategori wajib diisi")
    .trim()
    .cuid("Id kategori tidak valid"),
});

export const masukanWargaQuerySchema = z.object({
  q: z.string().optional(),
  status: z
    .nativeEnum(MasukanStatus, { message: "Status tidak valid" })
    .optional(),

  kategoriId: z
    .string()
    .optional()
    .refine((val) => !val || /^c[a-z0-9]{24}$/i.test(val), {
      message: "ID kategori tidak valid (harus berupa cuid)",
    }),

  verifiedByUserId: z
    .string()
    .optional()
    .refine((val) => !val || /^c[a-z0-9]{24}$/i.test(val), {
      message: "ID user tidak valid (harus berupa cuid)",
    }),

  createdAt: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?)?$/.test(val),
      {
        message:
          "Format tanggal tidak valid (gunakan YYYY-MM-DD atau YYYY-MM-DD HH:mm:ss)",
      }
    ),
});
