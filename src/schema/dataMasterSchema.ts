import { JenisDataMaster } from "@prisma/client";
import z from "zod";

export const dataMasterSchema = z.object({
  jenisData: z.nativeEnum(JenisDataMaster, {
    message: "Jenis data tidak valid",
  }),
  namaAtribut: z
    .string("Nama atribut harus teks")
    .trim()
    .min(1, "Nama atribut tidak boleh kosong"),
  nilai: z.string("Nilai harus teks").trim().min(1, "Nilai tidak boleh kosong"),
  lokasiRt: z
    .string("Lokasi RT harus teks")
    .trim()
    .min(1, "Lokasi RT tidak boleh kosong")
    .max(3, ""),

  lokasiRw: z
    .string("Lokasi RW harus teks")
    .trim()
    .min(1, "Lokasi RW tidak boleh kosong"),
});

export const dataMasterQuerySchema = z.object({
  q: z.string("Query harus teks").optional(),
  jenisData: z
    .nativeEnum(JenisDataMaster, {
      message: "Jenis data tidak valid",
    })
    .optional(),
  lokasiRt: z
    .string("Lokasi RT harus teks")
    .trim()
    .min(1, "Lokasi RT tidak boleh kosong")
    .max(3, "Lokasi RT maksimal 3 karakter")
    .optional(),
  nilai: z
    .string("Nilai harus teks")
    .trim()
    .min(1, "Nilai tidak boleh kosong")
    .optional(),
  lokasiRw: z
    .string("Lokasi RW harus teks")
    .trim()
    .min(1, "Lokasi RW tidak boleh kosong")
    .max(3, "Lokasi RW maksimal 3 karakter")
    .optional(),
  updatedAt: z.string().optional(),
});

export const dataMasterQueryById = z.object({
  id: z
    .cuid("Id data master tidak valid")
    .trim()
    .min(1, "Id data master tidak valid"),
});

export const dataMasterArraySchema = z.array(dataMasterSchema);
