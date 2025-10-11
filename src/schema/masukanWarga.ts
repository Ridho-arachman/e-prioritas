import z from "zod";

export const createMasukanWargaSchema = z.object({
  namaPengirim: z.string().trim(),
  emailPengirim: z.string().email("Format email tidak valid").trim(),
  lokasiRtrw: z.string().min(1, "Lokasi RT/RW tidak boleh kosong").trim(),
  deskripsiMasukan: z.string().min(1, "Isi masukan tidak boleh kosong").trim(),
  kategoriId: z.string().cuid(), // ID kategori masukan, misalnya "Umum"
});
