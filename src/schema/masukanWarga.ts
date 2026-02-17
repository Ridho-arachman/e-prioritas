import { StatusMasukan } from "@/app/generated/prisma";
import z from "zod";

export const createMasukanWargaSchema = z.object({
  namaPengirim: z
    .string("Nama pengirim harus teks")
    .trim()
    .min(1, "Nama pengirim tidak boleh kosong")
    .max(255, "Nama pengirim maksimal 255 karakter"),
  nomorHp: z
    .string()
    .trim()
    .min(10, "Minimal 10 digit")
    .max(13, "Maksimal 13 digit")
    .regex(/^08[0-9]{8,11}$/, "Format harus 08xxxxxxxxx"),
  judul: z
    .string()
    .trim()
    .min(1, "Judul tidak boleh kosong")
    .max(255, "Judul maksimal 255 karakter"),
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
  deskripsi: z
    .string("Deskripsi masukan harus teks")
    .trim()
    .min(1, "Deskripsi masukan tidak boleh kosong"),
  domainIsuId: z
    .string("Kategori id harus teks")
    .trim()
    .cuid("Kategori id tidak valid"),
});

export const editStatusMasukanWargaSchema = z.object({
  status: z.nativeEnum(StatusMasukan, { message: "Status tidak valid" }),
  diverifikasiOlehId: z.string("ID user wajib diisi").trim(),
  alasanPenolakan: z
    .string("Alasan penolakan")
    .trim()
    .min(1, "Alasan penolakan tidak boleh kosong")
    .optional(),
});

export const masukanWargaByIdSchema = z.object({
  id: z.string("Id kategori wajib diisi").trim(),
});

export const masukanWargaQuerySchema = z.object({
  q: z.string().optional(),
  status: z
    .nativeEnum(StatusMasukan, { message: "Status tidak valid" })
    .optional(),
  domainIsuId: z
    .string()
    .optional()
    .refine((val) => !val || /^c[a-z0-9]{24}$/i.test(val), {
      message: "ID domain isu tidak valid",
    }),
  diverifikasiOlehId: z.string().optional(),
  createdAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Format tanggal harus YYYY-MM-DD",
    })
    .optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  perPage: z.coerce.number().int().positive().max(100).optional().default(10),
  sortBy: z.string().optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});
