import z from "zod";

// Helper untuk mengubah input string menjadi number atau null
const stringToNumber = (val: unknown) => {
  if (val === "" || val === null || val === undefined) return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
};

export const dataMasterSchema = z.object({
  domainIsuId: z.string().cuid("Domain Isu ID tidak valid"),
  namaAtribut: z.string().min(1, "Nama atribut tidak boleh kosong"),
  nilai: z.string().min(1, "Nilai tidak boleh kosong"),

  // Langsung terima number atau null (tanpa preprocess)
  lokasiRt: z.number().int().min(1).max(999).nullable().optional(),
  lokasiRw: z.number().int().min(1).max(999).nullable().optional(),
  jumlah: z.number().int().min(0).nullable().optional(),

  sumberData: z.string().nullable().optional(),
});

// Schema untuk query parameters (GET)
export const dataMasterQuerySchema = z.object({
  q: z.string().optional(), // pencarian di namaAtribut
  domainIsuId: z.string().cuid().optional(),
  lokasiRt: z
    .preprocess(
      (val) => (val === undefined || val === "" ? undefined : Number(val)),
      z.number().int().min(1).max(999),
    )
    .optional(),
  lokasiRw: z
    .preprocess(
      (val) => (val === undefined || val === "" ? undefined : Number(val)),
      z.number().int().min(1).max(999),
    )
    .optional(),
  nilai: z.string().optional(), // pencarian exact match atau contains
  updatedAt: z.string().optional(), // format YYYY-MM-DD
});

// Schema untuk parameter ID (misal untuk detail/update)
export const dataMasterParamSchema = z.object({
  id: z.string().cuid("ID data master tidak valid"),
});

export const dataMasterArraySchema = z.array(dataMasterSchema);
