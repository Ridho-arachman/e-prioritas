import { extractErrors } from "@/lib/extractErrors";
import { prisma } from "@/lib/prisma";
import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  const body = await req.json();
};

const POST = async (req: NextRequest) => {
  const body = await req.json();

  const parsed = createMasukanWargaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: extractErrors(parsed) },
      { status: 400 }
    );
  }

  const {
    namaPengirim,
    emailPengirim,
    lokasiRtrw,
    deskripsiMasukan,
    kategoriId,
  } = parsed.data;

  try {
    const masukan = await prisma.masukanWarga.create({
      data: {
        namaPengirim,
        emailPengirim,
        lokasiRtrw,
        deskripsiMasukan,
        kategoriId,
      },
    });
  } catch (err: any) {}
};

const PUT = async (req: NextRequest) => {
  const body = await req.json();
};

const DELETE = async (req: NextRequest) => {
  const body = await req.json();
};

export { GET, POST, PUT, DELETE };
