import { StatusProgram } from "@/app/generated/prisma";
import { z } from "zod";

const emptyToUndefined = z.preprocess(
  (val) => (val === "" || val === null ? undefined : val),
  z.any(),
);

const baseProgramKelurahanSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi").max(255),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  status: z.nativeEnum(StatusProgram).default(StatusProgram.BERJALAN),
  tanggalMulai: z.string().optional().nullable(),
  tanggalSelesai: z.string().optional().nullable(),
  pic: z.string().min(1, "PIC wajib diisi").max(100),
  domainIsuId: z.string().min(1, "Domain Isu wajib diisi"),
  lokasi: z.string().optional().nullable(), // ✅ single field
});

export const programKelurahanCreateSchema = baseProgramKelurahanSchema
  .refine(
    (data) => {
      if (data.tanggalMulai && data.tanggalSelesai) {
        return new Date(data.tanggalMulai) <= new Date(data.tanggalSelesai);
      }
      return true;
    },
    {
      message: "Tanggal mulai tidak boleh setelah tanggal selesai",
      path: ["tanggalMulai"],
    },
  )
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (data.status === StatusProgram.BERJALAN && data.tanggalMulai) {
        const tanggalMulai = new Date(data.tanggalMulai);
        tanggalMulai.setHours(0, 0, 0, 0);
        return tanggalMulai <= today;
      }
      return true;
    },
    {
      message: "Tanggal mulai tidak boleh lewat hari ini untuk status berjalan",
      path: ["tanggalMulai"],
    },
  )
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (data.status === StatusProgram.SELESAI && data.tanggalSelesai) {
        const tanggalSelesai = new Date(data.tanggalSelesai);
        tanggalSelesai.setHours(0, 0, 0, 0);
        return tanggalSelesai <= today;
      }
      return true;
    },
    {
      message: "Tanggal selesai tidak boleh lewat hari ini untuk status selesai",
      path: ["tanggalSelesai"],
    },
  )

  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (data.status === StatusProgram.DITUNDA && data.tanggalMulai) {
        const tanggalMulai = new Date(data.tanggalMulai);
        tanggalMulai.setHours(0, 0, 0, 0);
        return tanggalMulai >= today;
      }
      return true;
    },
    {
      message: "Tanggal mulai tidak boleh sebelum hari ini untuk status ditunda",
      path: ["tanggalMulai"],
    },
  )
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (data.status === StatusProgram.DITUNDA && data.tanggalMulai) {
        const tanggalMulai = new Date(data.tanggalMulai);
        tanggalMulai.setHours(0, 0, 0, 0);
        return tanggalMulai >= today;
      }
      return true;
    },
    {
      message: "Tanggal mulai tidak boleh sebelum hari ini untuk status ditunda",
      path: ["tanggalMulai"],
    },
  )
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (data.status === StatusProgram.BERJALAN && data.tanggalSelesai) {
        const tanggalSelesai = new Date(data.tanggalSelesai);
        tanggalSelesai.setHours(0, 0, 0, 0);
        return tanggalSelesai >= today;
      }
      return true;
    },
    {
      message: "Tanggal selesai sudah lewat hari ini, status tidak boleh berjalan",
      path: ["status"],
    },
  );

export type ProgramKelurahanFormData = z.infer<
  typeof programKelurahanCreateSchema
>;

const partialBaseSchema = baseProgramKelurahanSchema.partial();

export const programKelurahanUpdateSchema = partialBaseSchema
  .extend({
    status: emptyToUndefined.pipe(z.nativeEnum(StatusProgram).optional()),
  })
  .refine(
    (data) => {
      if (data.tanggalMulai && data.tanggalSelesai) {
        return new Date(data.tanggalMulai) <= new Date(data.tanggalSelesai);
      }
      return true;
    },
    {
      message: "Tanggal mulai tidak boleh setelah tanggal selesai",
      path: ["tanggalMulai"],
    },
  )
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (data.status === StatusProgram.BERJALAN && data.tanggalMulai) {
        const tanggalMulai = new Date(data.tanggalMulai);
        tanggalMulai.setHours(0, 0, 0, 0);
        return tanggalMulai <= today;
      }
      return true;
    },
    {
      message: "Tanggal mulai tidak boleh lewat hari ini untuk status berjalan",
      path: ["tanggalMulai"],
    },
  )
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (data.status === StatusProgram.SELESAI && data.tanggalSelesai) {
        const tanggalSelesai = new Date(data.tanggalSelesai);
        tanggalSelesai.setHours(0, 0, 0, 0);
        return tanggalSelesai <= today;
      }
      return true;
    },
    {
      message: "Tanggal selesai tidak boleh lewat hari ini untuk status selesai",
      path: ["tanggalSelesai"],
    },
  )

  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (data.status === StatusProgram.BERJALAN && data.tanggalSelesai) {
        const tanggalSelesai = new Date(data.tanggalSelesai);
        tanggalSelesai.setHours(0, 0, 0, 0);
        return tanggalSelesai >= today;
      }
      return true;
    },
    {
      message: "Tanggal selesai sudah lewat hari ini, status tidak boleh berjalan",
      path: ["status"],
    },
  );

export const programKelurahanQuerySchema = z.object({
  q: z.string().optional(),
  status: z.nativeEnum(StatusProgram).optional(),
  domainIsuId: z.string().cuid().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z
    .enum([
      "judul",
      "status",
      "createdAt",
      "updatedAt",
      "tanggalMulai",
      "lokasi",
    ])
    .default("updatedAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const programKelurahanParamSchema = z.object({
  id: z.string().cuid(),
});
