import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const POST = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return NextResponse.json({ message: "Logout Berhasil" }, { status: 200 });
};

export { POST };
