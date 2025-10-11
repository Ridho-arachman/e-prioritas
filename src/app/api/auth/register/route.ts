// import { Prisma } from "@/generated/prisma";
import { hashPassword } from "@/lib/hashing";
import { prisma } from "@/lib/prisma";
import { extractErrors } from "@/lib/extractErrors";
import { createUserSchema } from "@/schema/sign-up";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { success: false, errors: extractErrors(parsed) },
        { status: 400 }
      );

    const { name, email, password, jabatan, role } = parsed.data;

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        jabatan,
        role: role || "PERANGKAT_DESA",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Perangkat Desa Berhasil Di Daftarkan",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { POST };
