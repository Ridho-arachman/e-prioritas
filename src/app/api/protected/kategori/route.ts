import { cors } from "@/lib/cors";
import { extractErrors } from "@/lib/extractErrors";
import { prisma } from "@/lib/prisma";
import { kategoriSchema } from "@/schema/kategoriSchema";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  try {
    //AMBIL DATA KATEGORI DARI DATABASE
    const data = await prisma.kategori.findMany();

    //JIKA DATA KOSONG
    if (data.length === 0) {
      return NextResponse.json(
        { success: true, message: "Data kategori masih kosong" },
        { status: 404 }
      );
    }

    //JIKA DATA ADA
    return NextResponse.json(
      { success: true, message: "Data kategori berhasil diambil", data },
      { status: 200 }
    );
  } catch (err) {
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

  try {
    //NGGAMBIL REQ BODY
    const body = await req.json();

    // VALIDASI REQ BODY DENGAN ZOD
    const parsed = kategoriSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: extractErrors(parsed) },
        { status: 400 }
      );
    }

    //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const { namaKategori, deskripsi } = parsed.data;

    //SIMPAN DATA KATEGORI KE DATABASE
    const kategori = await prisma.kategori.create({
      data: {
        namaKategori,
        deskripsi,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Kategori Berhasil Ditambahkan",
        data: kategori,
      },
      { status: 201, headers }
    );
  } catch (err) {
    //JIKA NAMA KATEGORI SUDAH ADA
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002")
        return NextResponse.json(
          { success: false, message: "Kategori sudah ada" },
          { status: 400, headers }
        );
    }

    return NextResponse.json(
      { success: false, message: "Terjadi Error pada server" },
      { status: 500, headers }
    );
  }
};

export { GET, POST };
