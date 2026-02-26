import z from "zod";
import { StatusMasukan } from "@/app/generated/prisma";

//////////////////////////////////////////////////////////////
// CREATE MASUKAN WARGA
//////////////////////////////////////////////////////////////

export const createMasukanWargaSchema = z.object({
  namaPengirim: z
    .string()
    .trim()
    .min(1, "Nama pengirim tidak boleh kosong")
    .max(255, "Nama pengirim maksimal 255 karakter"),

  nomorHp: z
    .string()
    .trim()
    .regex(/^08[0-9]{8,12}$/, "Format harus 08xxxxxxxxxx"),

  judul: z
    .string()
    .trim()
    .min(1, "Judul tidak boleh kosong")
    .max(255, "Judul maksimal 255 karakter"),

  lokasiRt: z
    .string()
    .trim()
    .regex(/^[0-9]{3}$/, "RT harus 3 digit (contoh: 001)"),

  lokasiRw: z
    .string()
    .trim()
    .regex(/^[0-9]{3}$/, "RW harus 3 digit (contoh: 001)"),

  deskripsi: z.string().trim().min(1, "Deskripsi tidak boleh kosong"),
  isLocked: z.boolean().optional().default(false),

  // ✅ Optional: expiresAt untuk relevance tracking
  expiresAt: z.union([z.date(), z.string()]).optional(),

  domainIsuId: z.string().trim().cuid("Domain isu tidak valid"),
});

//////////////////////////////////////////////////////////////
// EDIT STATUS MASUKAN WARGA
//////////////////////////////////////////////////////////////

export const editStatusMasukanWargaSchema = z
  .object({
    status: z.nativeEnum(StatusMasukan, {
      message: "Status tidak valid",
    }),

    diverifikasiOlehId: z.string("ID user tidak valid").trim(),

    alasanPenolakan: z
      .string()
      .trim()
      .min(1, "Alasan penolakan wajib diisi")
      .optional(),
  })
  .superRefine((data, ctx) => {
    /**
     * RULE:
     * Jika status DITOLAK → alasan wajib
     */
    if (data.status === StatusMasukan.DITOLAK && !data.alasanPenolakan) {
      ctx.addIssue({
        code: "custom",
        message: "Alasan penolakan wajib jika status DITOLAK",
        path: ["alasanPenolakan"],
      });
    }

    /**
     * RULE:
     * Jika status bukan DITOLAK → alasan harus kosong
     */
    if (data.status !== StatusMasukan.DITOLAK && data.alasanPenolakan) {
      ctx.addIssue({
        code: "custom",
        message: "Alasan penolakan hanya boleh diisi jika status DITOLAK",
        path: ["alasanPenolakan"],
      });
    }
  });

//////////////////////////////////////////////////////////////
// MASUKAN WARGA BY ID
//////////////////////////////////////////////////////////////

export const masukanWargaByIdSchema = z.object({
  id: z.string().trim().cuid("ID tidak valid"),
});

//////////////////////////////////////////////////////////////
// QUERY / FILTER MASUKAN WARGA
//////////////////////////////////////////////////////////////

export const masukanWargaQuerySchema = z.object({
  q: z.string().trim().optional(),

  status: z
    .nativeEnum(StatusMasukan, { message: "Status tidak valid" })
    .optional(),

  domainIsuId: z.string().trim().cuid("Domain isu tidak valid").optional(),

  diverifikasiOlehId: z.string().trim().cuid("ID user tidak valid").optional(),

  lokasiRt: z
    .string()
    .trim()
    .regex(/^[0-9]{3}$/, "RT harus 3 digit")
    .optional(),

  lokasiRw: z
    .string()
    .trim()
    .regex(/^[0-9]{3}$/, "RW harus 3 digit")
    .optional(),

  createdAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Format tanggal harus YYYY-MM-DD",
    })
    .optional(),

  page: z.coerce.number().int().positive().default(1),

  perPage: z.coerce.number().int().positive().max(100).default(10),

  sortBy: z
    .enum(["createdAt", "updatedAt", "judul", "status"])
    .default("createdAt"),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
