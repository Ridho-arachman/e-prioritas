import { StatusMasukan } from "@/app/generated/prisma";
import { z } from "zod";

// Schema untuk form dari user (belum punya wargaId)
export const createMasukanWargaFormSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi").max(255),
  noHp: z.string().min(10, "Nomor HP minimal 10 digit").max(20),
  alamat: z.string().optional(),
  judul: z.string().min(1, "Judul tidak boleh kosong").max(255),
  lokasi: z.string().min(1, "Lokasi wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi tidak boleh kosong"),
  domainIsuId: z.string().cuid("Domain isu tidak valid"),
});

// Schema untuk internal create (menggunakan wargaId)
export const createMasukanWargaInternalSchema = z.object({
  wargaId: z.string().cuid(),
  judul: z.string().min(1),
  deskripsi: z.string().min(1),
  lokasi: z.string().min(1),
  domainIsuId: z.string().cuid(),
});

// Schema untuk update status
export const editStatusMasukanWargaSchema = z
  .object({
    status: z.nativeEnum(StatusMasukan),
    diverifikasiOlehId: z.string().optional(), // hapus .cuid()
    alasanPenolakan: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === "DITOLAK" && !data.alasanPenolakan) {
      ctx.addIssue({
        code: "custom",
        message: "Alasan penolakan wajib",
        path: ["alasanPenolakan"],
      });
    }
  });

export const masukanWargaByIdSchema = z.object({ id: z.string().cuid() });

export const masukanWargaQuerySchema = z.object({
  q: z.string().optional(),
  status: z.nativeEnum(StatusMasukan).optional(),
  domainIsuId: z.string().cuid().optional(),
  diverifikasiOlehId: z.string().optional(),
  lokasi: z.string().optional(),
  createdAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z
    .enum(["createdAt", "updatedAt", "judul", "status", "lokasi"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
