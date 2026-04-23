import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import prisma from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { createMasukanWargaInternalSchema } from "@/schema/masukanWarga";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const key = `api:ip:${ip}`;
  const limit = await checkRateLimit(key, 60, 60 * 1000);
  if (!limit.success) {
    return handleResponse({
      success: false,
      message: "Terlalu banyak percobaan",
      status: 429,
    });
  }

  try {
    const formData = await req.formData();
    const wargaId = formData.get("wargaId") as string;
    const judul = formData.get("judul") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const lokasi = formData.get("lokasi") as string;
    const domainIsuId = formData.get("domainIsuId") as string;
    const imageFiles = formData.getAll("images") as File[];

    const parsed = createMasukanWargaInternalSchema.safeParse({
      wargaId,
      judul,
      deskripsi,
      lokasi,
      domainIsuId,
    });
    if (!parsed.success)
      return handleResponse({
        success: false,
        message: "Data tidak valid",
        status: 400,
      });

    // Validasi warga dan status verifikasi
    const warga = await prisma.warga.findUnique({
      where: { id: wargaId },
      select: { statusNoHp: true },
    });
    if (!warga)
      return handleResponse({
        success: false,
        message: "Warga tidak ditemukan",
        status: 404,
      });
    if (warga.statusNoHp !== "TERVERIFIKASI") {
      return handleResponse({
        success: false,
        message: "Nomor HP belum diverifikasi. Silakan verifikasi dulu.",
        status: 403,
      });
    }

    // Upload gambar dengan tipe eksplisit
    const uploadResults: Array<{ url: string; publicId: string }> = [];
    for (const file of imageFiles.slice(0, 5)) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadToCloudinary(buffer, "masukan-warga");
      uploadResults.push({ url: result.url, publicId: result.public_id });
    }

    let masukan;
    try {
      masukan = await prisma.$transaction(async (tx) => {
        const newMasukan = await tx.masukanWarga.create({
          data: {
            judul: parsed.data.judul,
            deskripsi: parsed.data.deskripsi,
            lokasi: parsed.data.lokasi,
            domainIsuId: parsed.data.domainIsuId,
            wargaId: parsed.data.wargaId,
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
    } catch (err) {
      for (const img of uploadResults)
        await deleteFromCloudinary(img.publicId).catch(console.error);
      throw err;
    }

    return handleResponse({
      success: true,
      message: "Masukan berhasil disimpan",
      data: masukan,
      status: 201,
    });
  } catch (err) {
    console.error(err);
    const prismaError = handlePrismaError(err);
    if (prismaError)
      return handleResponse({
        success: false,
        message: prismaError.message,
        status: prismaError.status,
      });
    return handleResponse({
      success: false,
      message: "Terjadi kesalahan",
      status: 500,
    });
  }
}
