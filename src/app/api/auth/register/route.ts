// import { Prisma } from "@/generated/prisma";
import { hashPassword } from "@/lib/hashing";
import { prisma } from "@/lib/prisma";
import { extractErrors } from "@/lib/extractErrors";
import { createUserSchema } from "@/schema/sign-up";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    // parse body
    const body = await req.json();

    // validation
    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { success: false, errors: extractErrors(parsed) },
        { status: 400 }
      );

    // get data
    const { name, email, password } = parsed.data;

    // hashing password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
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
    // cek berdasarkan code aja
    if (e?.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // internal server error
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { POST };
