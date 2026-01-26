import { dashboardService } from "@/services/dashboard";
import { handleResponse } from "@/lib/handleResponse";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
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
    const [monthlyData, dataMasterCategory] = await Promise.all([
      dashboardService.getMonthlyMasukanStats(),
      dashboardService.getDataMasterStats(),
    ]);

    return handleResponse({
      success: true,
      message: "Data chart berhasil diambil",
      data: { monthlyData, dataMasterCategory },
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
