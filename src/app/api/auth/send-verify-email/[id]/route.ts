import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render, renderAsync } from "@react-email/render";
import { generateVerifyToken } from "@/lib/jwtHelper";
import { prisma } from "@/lib/prisma";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import { handleResponse } from "@/lib/responseHandler";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  _req: NextRequest,
  ctx: RouteContext<"/api/auth/send-verify-email/[id]">
) {
  const { id } = await ctx.params;

  const perangkat = await prisma.user.findUnique({
    where: { id },
  });

  if (!perangkat) {
    return handleResponse({
      success: false,
      message: "Perangkat tidak ditemukan",
      status: 404,
    });
  }

  const token = await generateVerifyToken(perangkat);

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify/${token}`;

  const html = await render(
    VerificationEmail({ nama: perangkat.name, verifyUrl })
  );

  const a = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [perangkat.email],
    subject: "hello world",
    html,
  });

  console.log("log:", a);

  return handleResponse({
    success: true,
    message: "Verify Ulang Email Berhasil Terkirim",
    status: 200,
  });
}
