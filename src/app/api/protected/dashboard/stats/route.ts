import { cors } from "@/lib/cors";
import { verifyApiToken } from "@/lib/auth";
import { handleResponse } from "@/lib/responseHandler";
import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "@/services/dashboard";
import { handlePrismaError } from "@/lib/handlePrismaError";

export async function GET(req: NextRequest) {
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
    const stats = await dashboardService.getDashboardStats();

    const masukanPie = [
      { name: "Menunggu", value: stats.masukanWaiting },
      { name: "Diterima", value: stats.masukanAccepted },
      { name: "Ditolak", value: stats.masukanRejected },
    ];

    return handleResponse({
      success: true,
      message: "Data statistik berhasil diambil",
      data: {
        ...stats,
        masukanPie, // tambahan untuk frontend
      },
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
}
