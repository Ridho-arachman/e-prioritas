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
  lokasiRtrw: z
    .string("Lokasi RT/RW harus teks")
    .trim()
    .min(1, "Lokasi RT/RW tidak boleh kosong"),
  deskripsiMasukan: z
    .string("Isi masukan harus teks")
    .trim()
    .min(1, "Isi masukan tidak boleh kosong"),
  kategoriId: z
    .string("Kategori id harus teks")
    .trim()
    .cuid("Kategori id tidak valid"),
  status: z
    .nativeEnum(MasukanStatus, { message: "Status tidak valid" })
    .optional(),
  verifiedByUserId: z
    .string("Verified by user id harus teks")
    .trim()
    .cuid("Verified by user id tidak valid")
    .optional(),
});

export const editStatusMasukanWargaSchema = z.object({
  status: z
    .nativeEnum(MasukanStatus, { message: "Status tidak valid" })
    .optional(),
});

export const masukanWargaByIdSchema = z.object({
  id: z
    .cuid("Id kategori tidak valid")
    .trim()
    .min(1, "Id kategori tidak valid"),
});

export const masukanWargaQuerySchema = z.object({
  namaPengirim: z
    .string("Nama pengirim harus teks")
    .trim()
    .max(255, "Nama pengirim maksimal 255 karakter")
    .optional(),

  emailPengirim: z
    .string("Email harus teks")
    .trim()
    .email("Format email tidak valid")
    .optional(),

  lokasiRtrw: z
    .string("Lokasi RT/RW harus teks")
    .trim()
    .max(255, "Lokasi maksimal 255 karakter")
    .optional(),

  status: z.enum(["MENUNGGU_VERIFIKASI", "DITERIMA", "DITOLAK"]).optional(),

  kategoriId: z
    .string("ID kategori harus teks")
    .cuid("ID kategori tidak valid")
    .optional(),
});
