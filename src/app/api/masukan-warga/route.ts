// app/api/masukan-warga/route.ts
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { decrypt, encrypt } from "@/lib/encryption"; // 👈 tambahkan
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import prisma from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const key = `api:ip:${ip}`;
  const limit = await checkRateLimit(key, 60, 60 * 1000);
  if (!limit.success) {
    return handleResponse({
      success: false,
      message: "Terlalu banyak percobaan, coba lagi nanti",
      status: 429,
      headers: { "Retry-After": String(limit.retryAfter) },
    });
  }

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

    // 👇 Enkripsi nomor HP sebelum disimpan
    const encryptedNomorHp = parsed.data.nomorHp
      ? encrypt(parsed.data.nomorHp)
      : null;

    const imageFiles = formData.getAll("images") as File[];
    const MAX_IMAGES = 5;
    const filesToUpload = imageFiles.slice(0, MAX_IMAGES);

    // Upload semua file ke Cloudinary
    const uploadResults: Array<{ url: string; publicId: string }> = [];
    for (const file of filesToUpload) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await uploadToCloudinary(
          buffer,
          "masukan-warga",
          `masukan_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        );
        uploadResults.push({
          url: result.url,
          publicId: result.public_id,
        });
      } catch (uploadError) {
        for (const uploaded of uploadResults) {
          await deleteFromCloudinary(uploaded.publicId).catch(console.error);
        }
        throw new Error("Gagal mengupload gambar");
      }
    }

    let masukan;
    try {
      masukan = await prisma.$transaction(async (tx) => {
        const newMasukan = await tx.masukanWarga.create({
          data: {
            id: trackingId || undefined,
            judul: parsed.data.judul,
            deskripsi: parsed.data.deskripsi,
            lokasiRt: parsed.data.lokasiRt,
            lokasiRw: parsed.data.lokasiRw,
            domainIsuId: parsed.data.domainIsuId,
            namaPengirim: parsed.data.namaPengirim,
            nomorHp: encryptedNomorHp, // 👈 simpan ciphertext
            status: "MENUNGGU",
          },
        });

        for (const img of uploadResults) {
          await tx.gambarMasukan.create({
            data: {
              url: img.url,
              publicId: img.publicId,
              masukanId: newMasukan.id,
            },
          });
        }

        return newMasukan;
      });
    } catch (dbError) {
      for (const img of uploadResults) {
        await deleteFromCloudinary(img.publicId).catch(console.error);
      }
      throw dbError;
    }

    // 👇 Dekripsi nomor HP untuk response (opsional)
    const decryptedMasukan = {
      ...masukan,
      nomorHp: masukan.nomorHp ? decrypt(masukan.nomorHp) : null,
    };

    return handleResponse({
      success: true,
      message: "Masukan Warga Berhasil Ditambahkan",
      data: decryptedMasukan,
      status: 201,
    });
  } catch (err) {
    console.error("CREATE MASUKAN ERROR:", err);
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    return handleResponse({
      success: false,
      message: err instanceof Error ? err.message : "Terjadi error pada server",
      status: 500,
    });
  }
}
