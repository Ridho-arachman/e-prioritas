import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "@/services/dashboard";
import { cors } from "@/lib/cors";
import { verifyApiToken } from "@/lib/auth";
import { handleResponse } from "@/lib/responseHandler";
import { handlePrismaError } from "@/lib/handlePrismaError";

export async function GET(req: NextRequest) {
  // ✅ CORS
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
    const [monthlyData, dataMasterCategory] = await Promise.all([
      dashboardService.getMonthlyMasukanStats(),
      dashboardService.getDataMasterStats(),
    ]);

    return handleResponse({
      success: true,
      message: "Data chart berhasil diambil",
      data: { monthlyData, dataMasterCategory },
      status: 200,
      headers,
    });
  } catch (err) {
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
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
}
