import { verifyApiToken } from "@/lib/auth";
import { cors } from "@/lib/cors";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/responseHandler";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildPrompt } from "@/lib/buildPrompt";
import { geminiAi } from "@/lib/gemini";
import {
  postRekomendasiSchema,
  queryRekomendasiSchema,
} from "@/schema/rekomendasiSchema";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { rekomendasiService } from "@/services/rekomendasiService";

type PrioritasItem = {
  prioritas_ke: number;
  deskripsi: string;
  skor_prioritas: number;
  alasan_analisis: string;
  masukan_terkait_ids: string[];
};

type AiResponseData = {
  judul_laporan: string;
  tanggal_proses: string;
  rekomendasi_prioritas: PrioritasItem[];
};

const POST = async (req: NextRequest) => {
  // CORS & Authorization Checks (Sudah Anda Sediakan)
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  const user = await verifyApiToken(req);

  if (!user || user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: user
        ? "Anda tidak memiliki akses untuk terhadap data ini"
        : "Unauthorized: Token invalid",
      status: user ? 403 : 401,
      headers,
    });
  }

  try {
    const body = await req.json();

    const parsed = postRekomendasiSchema.safeParse(body);

    if (!parsed.success) return handleZodValidation(parsed, headers);

    const { judulLaporan } = parsed.data;

    // --- 1. PENGAMBILAN DATA SUMBER & FILTER WAKTU ---
    const batasWaktu = new Date();
    // Atur filter waktu, misalnya, 6 bulan terakhir
    batasWaktu.setMonth(batasWaktu.getMonth() - 6);

    const [masukanWarga, dataMaster, rekomendasiLama] =
      await prisma.$transaction([
        // Ambil Masukan Warga yang DITERIMA dalam 6 bulan terakhir
        prisma.masukanWarga.findMany({
          where: {
            status: "DITERIMA", // Asumsi Anda menggunakan string 'DITERIMA'
            createdAt: { gte: batasWaktu },
          },
          select: {
            id: true,
            deskripsiMasukan: true,
            lokasiRt: true,
            lokasiRw: true,
            kategori: { select: { namaKategori: true } },
          },
        }),
        // Ambil Data Master terbaru
        prisma.dataMaster.findMany({
          select: {
            nilai: true,
            jenisData: true,
            namaAtribut: true,
            lokasiRt: true,
            lokasiRw: true,
          },
        }),
        // Ambil deskripsi rekomendasi lama untuk Exclusion List (pencegahan redundansi)
        prisma.rekomendasi.findMany({
          select: { prioritas1Deskripsi: true },
          where: { tanggalProses: { gte: batasWaktu } },
        }),
      ]);

    const exclusionTitles = rekomendasiLama
      .map((r) => r.prioritas1Deskripsi)
      .filter(Boolean); // Filter null/undefined

    // --- 2. PENENTUAN MODE ANALISIS & PROMPT ---
    const modeAnalisis =
      masukanWarga.length > 0 ? "FUSI_DATA" : "DATA_MASTER_SAJA";

    // Panggil fungsi utilitas untuk membuat string prompt
    const prompt = buildPrompt({
      mode: modeAnalisis,
      judulLaporan: judulLaporan,
      masukanWarga: masukanWarga,
      dataMaster: dataMaster,
      exclusionTitles: exclusionTitles,
    });

    // --- 3. PANGGILAN LLM & PARSING HASIL ---
    const aiResponseJsonString = await geminiAi(prompt);

    let hasilAnalisis: AiResponseData;
    try {
      hasilAnalisis = JSON.parse(aiResponseJsonString) as AiResponseData;
    } catch (e) {
      console.error("Failed to parse AI response:", aiResponseJsonString);
      return handleResponse({
        success: false,
        message: "Gagal memproses hasil AI. Format JSON tidak valid.",
        status: 500,
        headers,
      });
    }

    const rekomendasiPrioritas = hasilAnalisis.rekomendasi_prioritas;
    const prioritas1 = rekomendasiPrioritas[0];

    // Kumpulkan semua ID masukan yang terlibat dari semua prioritas
    const masukanIdsTerlibat = Array.from(
      new Set(rekomendasiPrioritas.flatMap((p) => p.masukan_terkait_ids || []))
    );

    // --- 4. TRANSAKSI PENYIMPANAN DATA & UPDATE STATUS ---
    const result = await prisma.$transaction(async (tx) => {
      // A. INSERT ke Rekomendasi
      const newRekomendasi = await tx.rekomendasi.create({
        data: {
          judul: judulLaporan,
          // *** SOLUSI AKHIR: Tambahkan tanggalProses secara eksplisit ***
          tanggalProses: new Date(),
          // *** End Perbaikan ***
          prioritas1Deskripsi: prioritas1.deskripsi,
          prioritas1Skor: prioritas1.skor_prioritas,
          laporanLengkap: hasilAnalisis as any, // Biarkan 'as any' untuk tipe Json
          processedByUserId: user.id,
        },
      });

      // B. INSERT ke RekomendasiMasukan (jika ada masukan yang terlibat)
      if (masukanIdsTerlibat.length > 0) {
        const masukanUntukDihubungkan = masukanIdsTerlibat.map((masukanId) => ({
          rekomendasiId: newRekomendasi.id,
          masukanId: masukanId,
        }));
        await tx.rekomendasiMasukan.createMany({
          data: masukanUntukDihubungkan,
          skipDuplicates: true, // Untuk jaga-jaga
        });

        // C. UPDATE Status MasukanWarga
        await tx.masukanWarga.updateMany({
          where: { id: { in: masukanIdsTerlibat } },
          data: { status: "DITERIMA" }, // Pastikan ENUM ini ada
        });
      }

      return newRekomendasi;
    });

    // Response Sukses
    return handleResponse({
      success: true,
      message: "Analisis rekomendasi AI berhasil diproses.",
      data: { rekomendasiId: result.id, judul: result.judul },
      status: 201,
      headers,
    });
  } catch (err) {
    // PRISMA & SERVER ERROR HANDLERS (Sudah Anda Sediakan)
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
        headers,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi error pada server: " + (err as Error).message,
      status: 500,
      headers,
    });
  }
};

const GET = async (req: NextRequest) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // VERIFIKASI JWT
  const user = await verifyApiToken(req);

  if (!user) {
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });
  }

  // AUTHORIZATION
  if (user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Anda tidak memiliki akses untuk terhadap data ini",
      status: 403,
    });
  }

  try {
    //AMBIL QUERY
    const searchParams = req.nextUrl.searchParams;
    const judulLaporan = searchParams.get("judulLaporan") || "";

    //VALIDASI QUERY
    const parsed = queryRekomendasiSchema.safeParse({ judulLaporan });
    if (!parsed.success) return handleZodValidation(parsed, headers);

    //HASIL VALIDASI
    const judul = parsed.data.judulLaporan;

    //AMBIL DATA KATEGORI DARI DATABASE
    const data = await rekomendasiService.getAll(judul);

    //JIKA DATA KOSONG

    if (data.length === 0) {
      return handleResponse({
        success: true,
        message: "Data Rekomendasi AI masih kosong",
        status: 404,
        headers,
      });
    }

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data Rekomendasi AI berhasil diambil",
      data,
      status: 200,
      headers,
    });
  } catch (err) {
    //PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
        headers,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
};

export { POST, GET };
