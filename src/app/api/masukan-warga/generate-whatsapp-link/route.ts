// app/api/masukan-warga/generate-whatsapp-link/route.ts
import { NextRequest } from "next/server";
import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const judul = formData.get("judul") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const lokasiRt = formData.get("lokasiRt") as string;
    const lokasiRw = formData.get("lokasiRw") as string;
    const domainIsuId = formData.get("domainIsuId") as string;
    const namaPengirim = formData.get("namaPengirim") as string | null;
    const nomorHp = formData.get("nomorHp") as string | null;
    const trackingId = formData.get("trackingId") as string | null;

    const parsed = createMasukanWargaSchema.safeParse({
      judul,
      deskripsi,
      lokasiRt,
      lokasiRw,
      domainIsuId,
      namaPengirim: namaPengirim || undefined,
      nomorHp: nomorHp || undefined,
    });
    if (!parsed.success) return handleZodValidation(parsed);

    const adminPhone = "6281911148789"; // Ganti dengan nomor admin
    const message =
      `*Masukan Baru dari Warga*\n\n` +
      `👤 Nama: ${parsed.data.namaPengirim || "Tidak disebutkan"}\n` +
      `📞 No. HP: ${parsed.data.nomorHp || "-"}\n` +
      `📌 Judul: ${parsed.data.judul}\n` +
      `📍 Lokasi: RT ${parsed.data.lokasiRt} / RW ${parsed.data.lokasiRw}\n\n` +
      `📝 Deskripsi:\n${parsed.data.deskripsi}\n\n` +
      `${trackingId ? `🔑 Kode Tracking: ${trackingId}\n\n` : ""}` +
      `*Instruksi:* Silakan kirim pesan ini untuk mengonfirmasi dan menindaklanjuti masukan. Terima kasih.`;

    const whatsappLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

    return handleResponse({
      success: true,
      data: { whatsappLink },
      message: "Link WhatsApp berhasil dibuat",
    });
  } catch (err) {
    console.error("GENERATE WHATSAPP LINK ERROR:", err);
    return handleResponse({
      success: false,
      message: "Gagal membuat link WhatsApp",
      status: 500,
    });
  }
}
