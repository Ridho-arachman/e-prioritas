import { cors } from "@/lib/cors";
import { extractErrors } from "@/lib/extractErrors";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { prisma } from "@/lib/prisma";
import { kategoriByIdSchema, kategoriSchema } from "@/schema/kategoriSchema";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/kategori/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // VALIDASI PARAM ID
  const { id } = await ctx.params;
  const parsedId = kategoriByIdSchema.safeParse({ id });
  if (!parsedId.success) {
    return NextResponse.json(
      { success: false, errors: extractErrors(parsedId) },
      { status: 400 }
    );
  }

  const kategoriId = parsedId.data.id;

  try {
    //AMBIL DATA KATEGORI DARI DATABASE BERDASARKAN ID
    const data = await prisma.kategori.findUniqueOrThrow({
      where: { id: kategoriId },
    });

    //JIKA DATA ADA
    return NextResponse.json(
      { success: true, message: "Data kategori berhasil diambil", data },
      { status: 200 }
    );
  } catch (err) {
    // JIKA ID TIDAK DITEMUKAN
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025" || err.code === "P2001") {
        return NextResponse.json(
          { success: false, message: "Data kategori tidak ditemukan" },
          { status: 404 }
        );
      }
    }
    // JIKA ERROR LAINNYA
    return NextResponse.json(
      { success: false, message: "Terjadi error pada server" },
      { status: 500 }
    );
  }
};

const PUT = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/kategori/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // NGGAMBIL REQ BODY & PARAM
  const { id } = await ctx.params;
  const body = await req.json();

  // VALIDASI REQ BODY & PARAM
  const parsed = kategoriSchema.safeParse(body);
  const parsedId = kategoriByIdSchema.safeParse({ id });
  if (!parsedId.success)
    return NextResponse.json(
      { success: false, errors: extractErrors(parsedId) },
      { status: 400 }
    );
  if (!parsed.success)
    return NextResponse.json(
      { success: false, errors: extractErrors(parsed) },
      { status: 400 }
    );

  // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
  const { namaKategori, deskripsi } = parsed.data;
  const kategoriId = parsedId.data.id;

  try {
    // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const { namaKategori, deskripsi } = parsed.data;

    // SIMPAN DATA KATEGORI KE DATABASE
    const kategori = await prisma.kategori.update({
      where: {
        id: kategoriId,
      },
      data: {
        namaKategori,
        deskripsi,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data kategori berhasil diupdate",
      data: kategori,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // JIKA ID TIDAK DITEMUKAN
      if (err.code === "P2025")
        return NextResponse.json(
          { success: false, message: "Data kategori tidak ditemukan" },
          { status: 404 }
        );
      // JIKA NAMA KATEGORI SUDAH ADA
      if (err.code === "P2002")
        return NextResponse.json(
          { success: false, message: "Nama kategori sudah digunakan" },
          { status: 409 }
        );
    }
    return NextResponse.json(
      { success: false, message: "Terjadi error pada server" },
      { status: 500 }
    );
  }
};

const DELETE = async (
  req: NextRequest,
  ctx: RouteContext<"/api/protected/kategori/[id]">
) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  try {
    // NGGAMBIL PARAM
    const { id } = await ctx.params;

    // VALIDASI REQ BODY & PARAM
    const parsedId = kategoriByIdSchema.safeParse({ id });
    if (!parsedId.success) {
      return NextResponse.json(
        { success: false, errors: extractErrors(parsedId) },
        { status: 400 }
      );
    }

    // JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const kategoriId = parsedId.data.id;

    // HAPUS DATA KATEGORI KE DATABASE
    const kategori = await prisma.kategori.delete({
      where: {
        id: kategoriId,
      },
    });

    // JIKA DATA KATEGORI TIDAK DITEMUKAN
    return NextResponse.json({
      success: true,
      message: "Data kategori berhasil dihapus",
      data: kategori,
    });
  } catch (err) {
    // JIKA ID TIDAK DITEMUKAN
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025")
        return NextResponse.json(
          { success: false, message: "Data kategori tidak ditemukan" },
          { status: 404 }
        );
      if (err.code === "P2003") {
        return NextResponse.json(
          {
            success: false,
            message:
              "Data kategori masih digunakan di data lain, tidak dapat dihapus",
          },
          { status: 400 }
        );
      }
    }
    return NextResponse.json(
      { success: false, message: "Terjadi error pada server" },
      { status: 500 }
    );
  }
};

export { PUT, DELETE, GET };
