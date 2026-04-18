// app/api/masukan-warga/[nomorHp]/route.ts (atau sesuai struktur folder Anda)
import { encrypt } from "@/lib/encryption"; // 👈 import fungsi enkripsi
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  console.log("id:", id);
  try {
    if (!id) {
      return handleResponse({
        success: false,
        message: "Nomor HP diperlukan",
        status: 400,
      });
    }

    // 👇 Enkripsi nomor HP yang diterima dari parameter
    const encryptedNomorHp = encrypt(id);

    // 👇 Cari data berdasarkan ciphertext
    const masukan = await prisma.masukanWarga.findFirstOrThrow({
      where: {
        nomorHp: encryptedNomorHp, // gunakan ciphertext untuk pencarian
      },
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
        // Jika ingin menampilkan nomor HP, bisa ditambahkan:
        // nomorHp: true,
      },
    });

    // Format tanggal untuk response
    const formattedData = {
      ...masukan,
      createdAt: masukan.createdAt.toISOString(),
      // Jika nomorHp ikut di-select dan ingin didekripsi:
      // nomorHp: masukan.nomorHp ? decrypt(masukan.nomorHp) : null,
    };

    return handleResponse({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    const prismaResponse = handlePrismaError(error);
    console.log(prismaResponse);

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
