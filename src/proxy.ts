import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./lib/prisma";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isActive: true },
  });

  const role = session.user.role;

  if (!user?.isActive) {
    const callback = encodeURIComponent(
      "/login?error=Akun+telah+dinonaktifkan",
    );
    return NextResponse.redirect(
      new URL(`/api/auth/logout?callback=${callback}`, request.url),
    );
  }

  //   Cek akses route
  if (
    request.nextUrl.pathname.startsWith("/perangkat") &&
    role !== "PERANGKAT_DESA"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/lurah") && role !== "LURAH") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/perangkat/:path*", "/lurah/:path*"],
};
