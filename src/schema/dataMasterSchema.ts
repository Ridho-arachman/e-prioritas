import z from "zod";

export const dataMasterSchema = z.object({
  jenisData: z
    .string("Jenis data harus teks")
    .trim()
    .min(1, "Jenis data tidak boleh kosong"),
  namaAtribut: z
    .string("Nama atribut harus teks")
    .trim()
    .min(1, "Nama atribut tidak boleh kosong"),
  nilai: z.string("Nilai harus teks").trim().min(1, "Nilai tidak boleh kosong"),
  lokasiRt: z
    .string("Lokasi RT harus teks")
    .trim()
    .min(1, "Lokasi RT tidak boleh kosong"),
  lokasiRw: z
    .string("Lokasi RW harus teks")
    .trim()
    .min(1, "Lokasi RW tidak boleh kosong"),
});
