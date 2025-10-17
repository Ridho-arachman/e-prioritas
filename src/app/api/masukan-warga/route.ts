import { cors } from "@/lib/cors";
import { prisma } from "@/lib/prisma";
import { extractErrors } from "@/lib/extractErrors";
import { NextRequest, NextResponse } from "next/server";
import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import { masukanWargaQuerySchema } from "@/schema/masukanWarga";

const GET = async (req: NextRequest) => {
  // ✅ CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // ✅ Ambil semua search params
  const searchParams = req.nextUrl.searchParams;
  const query = {
    namaPengirim: searchParams.get("namaPengirim") ?? undefined,
    emailPengirim: searchParams.get("emailPengirim") ?? undefined,
    lokasiRtrw: searchParams.get("lokasiRtrw") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    kategoriId: searchParams.get("kategoriId") ?? undefined,
  };

  // ✅ Validasi dengan Zod
  const parsed = masukanWargaQuerySchema.safeParse(query);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: extractErrors(parsed) },
      { status: 400 }
    );
  }

  const filters = parsed.data;

  try {
    // ✅ Bangun filter dinamis untuk Prisma
    const where: any = {};

    if (filters.namaPengirim) {
      where.namaPengirim = {
        contains: filters.namaPengirim,
        mode: "insensitive",
      };
    }

    if (filters.emailPengirim) {
      where.emailPengirim = {
        contains: filters.emailPengirim,
        mode: "insensitive",
      };
    }

    if (filters.lokasiRtrw) {
      where.lokasiRtrw = {
        contains: filters.lokasiRtrw,
        mode: "insensitive",
      };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.kategoriId) {
      where.kategoriId = filters.kategoriId;
    }

    // ✅ Ambil data dari database
    const data = await prisma.masukanWarga.findMany({
      where,
      include: {
        kategori: { select: { id: true, namaKategori: true } },
        verifiedBy: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    if (data.length === 0) {
      return NextResponse.json(
        { success: true, message: "Data masukan warga tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data masukan warga berhasil diambil", data },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ ERROR GET Masukan Warga:", err);
    return NextResponse.json(
      { success: false, message: "Terjadi error pada server" },
      { status: 500 }
    );
  }
};

const POST = async (req: NextRequest) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  //NGGAMBIL REQ BODY
  const body = await req.json();

  // VALIDASI REQ BODY DENGAN ZOD
  const parsed = createMasukanWargaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: extractErrors(parsed) },
      { status: 400 }
    );
  }

  //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
  const data = parsed.data;

  try {
    //SIMPAN DATA MASUKAN WARGA KE DATABASE
    const masukanWarga = await prisma.masukanWarga.create({
      data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Masukan Berhasil Ditambahkan",
        data: masukanWarga,
      },
      { status: 201, headers }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Terjadi Error pada server" },
      { status: 500, headers }
    );
  }
};

export { GET, POST };
