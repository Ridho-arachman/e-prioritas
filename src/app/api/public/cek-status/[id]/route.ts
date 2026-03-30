import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const masukan = await prisma.masukanWarga.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        judul: true,
        deskripsi: true,
        status: true,
        createdAt: true,
        namaPengirim: true,
        alasanPenolakan: true,
        domainIsu: {
          select: { nama: true },
        },
      },
    });

    // Format tanggal untuk response
    const formattedData = {
      ...masukan,
      createdAt: masukan.createdAt.toISOString(),
    };

    return handleResponse({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error cek status:", error);
    const prismaResponse = handlePrismaError(error);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
}
