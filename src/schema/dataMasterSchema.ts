import { NilaiKritikalitas } from "@/app/generated/prisma";
import z from "zod";

export const dataMasterSchema = z.object({
  domainIsuId: z.string().cuid("Domain Isu ID tidak valid"),

  namaAtribut: z
    .string()
    .trim()
    .min(1, "Nama atribut tidak boleh kosong")
    .max(100, "Maksimal 100 karakter"),

  kritikalitas: z.nativeEnum(NilaiKritikalitas, {
    message: "Kritikalitas tidak valid",
  }),

  jumlah: z
    .number()
    .int("Jumlah harus bilangan bulat")
    .min(0, "Jumlah tidak boleh negatif")
    .nullable()
    .optional(),

  lokasiRt: z
    .string()
    .trim()
    .max(3, "RT maksimal 3 karakter")
    .nullable()
    .optional(),

  lokasiRw: z
    .string()
    .trim()
    .max(3, "RW maksimal 3 karakter")
    .nullable()
    .optional(),

  sumberData: z.string().trim().nullable().optional(),
  isActive: z.boolean().optional().default(true),

  // ✅ Tambahkan: tahunData (Int?)
  tahunData: z.number().int().min(2020).max(2030).nullable().optional(),

  // ✅ Tambahkan: diprosesOlehId (String?)
  diprosesOlehId: z.string().cuid().nullable().optional(),
});

export const dataMasterParamSchema = z.object({
  id: z.string().cuid("ID data master tidak valid"),
});

export const dataMasterQuerySchema = z.object({
  q: z.string().optional(),

  domainIsuId: z.string().cuid().optional(),

  kritikalitas: z
    .nativeEnum(NilaiKritikalitas, {
      message: "Filter kritikalitas tidak valid",
    })
    .optional(),

  lokasiRt: z.string().optional(),
  lokasiRw: z.string().optional(),

  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Format tanggal harus YYYY-MM-DD",
    })
    .optional(),
});

export const dataMasterArraySchema = z.array(dataMasterSchema);
