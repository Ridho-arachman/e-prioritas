import { Prisma } from "@/generated/prisma";
import { hashPassword } from "@/lib/hashing";
import { prisma } from "@/lib/prisma";
import { createUserSchema } from "@/schema/sign-up";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // parse body
    const body = await req.json();

    // validation
    const parseResult = createUserSchema.safeParse(body);
    if (!parseResult.success) {
      const errors = parseResult.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // get data
    const { name, email, password } = parseResult.data;

    // hashing password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: "Data diterima",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    // error prisma
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { success: false, error: "Email sudah terdaftar" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
