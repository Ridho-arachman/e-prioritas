import { handleResponse } from "@/lib/handleResponse";
import { dashboardService } from "@/services/dashboard";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { auth } from "@/lib/auth";
import { Role } from "@/app/generated/prisma";
import { headers } from "next/headers";

export async function GET() {
  const allowedRoles: Role[] = ["ADMIN"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 403,
    });
  }

  if (!allowedRoles.includes(session.user.role as Role)) {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
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
        masukanPie,
      },
      status: 200,
    });
  } catch (err) {
    const prismaResponse = handlePrismaError(err);
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
