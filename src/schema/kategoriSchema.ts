import { StatusKategori } from "@/app/generated/prisma";
import z from "zod";

export const kategoriSchema = z.object({
  namaKategori: z
    .string("Nama kategori harus teks")
    .trim()
    .min(2, "Nama kategori tidak boleh kosong")
    .max(255, "Nama kategori maksimal 255 karakter"),
  deskripsi: z
    .string("Deskripsi harus berupa teks")
    .trim()
    .min(1, "Deskripsi tidak boleh kosong"),
  status: z.nativeEnum(StatusKategori, { message: "Status tidak valid" }),
});

export const kategoriByIdSchema = z.object({
  id: z
    .cuid("Id kategori tidak valid")
    .trim()
    .min(1, "Id kategori tidak valid"),
});

export const kategoriQuerySchema = z.object({
  namaKategori: z
    .string("Nama kategori harus teks")
    .max(255, "Nama kategori maksimal 255 karakter")
    .optional(),
});
