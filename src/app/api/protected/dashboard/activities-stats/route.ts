import { cors } from "@/lib/cors";
import { verifyApiToken } from "@/lib/auth";
import { handleResponse } from "@/lib/responseHandler";
import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "@/services/dashboard";
import { handlePrismaError } from "@/lib/handlePrismaError";

export async function GET(req: NextRequest) {
  // ✅ CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // ✅ VERIFIKASI JWT
  const user = await verifyApiToken(req);
  if (!user) {
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });
  }

  try {
    // ✅ Ambil statistik aktivitas
    const stats = await dashboardService.getActivityStats();

    return handleResponse({
      success: true,
      message: "Data statistik aktivitas berhasil diambil",
      data: stats,
      status: 200,
      headers,
    });
  } catch (err) {
    // ✅ Error dari Prisma
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
        headers,
      });
    }

    // ✅ Error umum
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
}
