import { cors } from "@/lib/cors";
import { handleResponse } from "@/lib/responseHandler";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.delete("accessToken");
    const refreshToken = cookieStore.delete("refreshToken");

    if (!accessToken || !refreshToken) {
      return handleResponse({
        success: false,
        message: "User belum login",
        status: 401,
      });
    }

    return handleResponse({
      success: true,
      message: "Logout Berhasil",
      status: 200,
    });
  } catch (err) {
    return handleResponse({
      success: false,
      message: "Terjadi Error pada server",
      status: 500,
    });
  }
};

export { POST };
