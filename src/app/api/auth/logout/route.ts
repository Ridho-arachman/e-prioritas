import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const POST = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.delete("accessToken");
    const refreshToken = cookieStore.delete("refreshToken");

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { success: false, message: "User belum login" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { succes: true, message: "Logout Berhasil" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Terjadi Error pada server" },
      { status: 500 }
    );
  }
};

export { POST };
