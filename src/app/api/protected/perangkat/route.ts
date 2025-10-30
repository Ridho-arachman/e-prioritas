import { verifyApiToken } from "@/lib/auth";
import { cors } from "@/lib/cors";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleZodValidation } from "@/lib/handleZodValidation";
import { hashPassword } from "@/lib/hashing";
import { generateVerifyToken } from "@/lib/jwtHelper";
import { handleResponse } from "@/lib/responseHandler";
import {
  createUserPerangkatSchema,
  queryUserPerangkatSchema,
} from "@/schema/userPerangkatSchema";
import { userService } from "@/services/userService";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { VerificationEmail } from "@/components/emails/VerificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const GET = async (req: NextRequest) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  // VERIFIKASI JWT
  const user = await verifyApiToken(req);

  if (!user) {
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });
  }

  // AUTHORIZATION
  if (user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Anda tidak memiliki akses untuk terhadap data ini",
      status: 403,
    });
  }

  try {
    //AMBIL QUERY
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const isActive = searchParams.get("isActive") || undefined;

    //VALIDASI QUERY
    const parsed = queryUserPerangkatSchema.safeParse({ q, isActive });
    if (!parsed.success) return handleZodValidation(parsed, headers);

    //HASIL VALIDASI
    const { isActive: isActiveParam, q: queryUser } = parsed.data;

    //AMBIL DATA KATEGORI DARI DATABASE
    const data = await userService.getAll(queryUser, isActiveParam);

    //JIKA DATA KOSONG

    if (data.length === 0) {
      if (queryUser)
        return handleResponse({
          success: true,
          message: "Data perangkat desa tidak ditemukan",
          status: 404,
          headers,
        });

      return handleResponse({
        success: true,
        message: "Data perangkat desa masih kosong",
        status: 404,
        headers,
      });
    }

    //JIKA DATA ADA
    return handleResponse({
      success: true,
      message: "Data perangkat desa berhasil diambil",
      data,
      status: 200,
      headers,
    });
  } catch (err) {
    //PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
        headers,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
};

const POST = async (req: NextRequest) => {
  //CORS
  const headers = cors(req, {
    allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
  if (headers instanceof NextResponse) return headers;

  //VERIFIKASI JWT
  const user = await verifyApiToken(req);
  if (!user) {
    return handleResponse({
      success: false,
      message: "Unauthorized: Token invalid",
      status: 401,
    });
  }

  // AUTHORIZATION
  if (user.role !== "ADMIN") {
    return handleResponse({
      success: false,
      message: "Anda tidak memiliki akses untuk terhadap data ini",
      status: 403,
    });
  }

  try {
    //VALIDASI REQ BODY
    const body = await req.json();

    const parsed = createUserPerangkatSchema.safeParse(body);

    if (!parsed.success) return handleZodValidation(parsed, headers);

    const { confirmPassword, password, ...parsedData } = parsed.data;

    //
    const hashedPassword = await hashPassword(password);

    //JIKA VALIDASI BERHASIL, AMBIL DATA YANG SUDAH DI PARSE
    const data = { ...parsedData, password: hashedPassword };

    //SIMPAN DATA KATEGORI KE DATABASE
    const perangkat = await userService.create(data);

    const verifyToken = generateVerifyToken(perangkat);

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify/${verifyToken}`;

    // const html = await render(
    //   VerificationEmail({
    //     nama: perangkat.name,
    //     verifyUrl,
    //   })
    // );
    console.log("Perangkat email:", perangkat.email);

    const a = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [perangkat.email],
      subject: "hello world",
      react: VerificationEmail({
        nama: perangkat.name,
        verifyUrl,
      }),
    });

    console.log("Resend response:", a);

    //BERHASIL
    return handleResponse({
      success: true,
      message: "Perangkat Desa Berhasil Ditambahkan",
      data: perangkat,
      status: 201,
      headers,
    });
  } catch (err) {
    //PRISMA ERROR
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
        headers,
      });
    }

    //SERVER ERROR
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
      headers,
    });
  }
};

export { GET, POST };
