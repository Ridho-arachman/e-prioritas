import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ isActive: false }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isActive: true },
    });

    return NextResponse.json({ isActive: user?.isActive ?? false });
  } catch (error) {
    console.error("Error checking active status:", error);
    return NextResponse.json({ isActive: false }, { status: 500 });
  }
}
