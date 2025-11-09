import { cors } from "@/lib/cors";
import { verifyApiToken } from "@/lib/auth";
import { handleResponse } from "@/lib/responseHandler";
import { NextRequest, NextResponse } from "next/server";
import { dashboardService } from "@/services/dashboard";
import { handlePrismaError } from "@/lib/handlePrismaError";

export async function GET(req: NextRequest) {
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  const user = await verifyApiToken(req);
  if (!user) {
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });
  }

  try {
    const activities = await dashboardService.getRecentActivities();

    return handleResponse({
      success: true,
      message: "Data aktivitas berhasil diambil",
      data: activities,
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
