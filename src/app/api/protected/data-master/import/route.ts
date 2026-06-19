import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { handleZodValidation } from "@/lib/handleZodValidation";
import prisma from "@/lib/prisma";
import { dataMasterArraySchema } from "@/schema/dataMasterSchema";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const allowedRoles: Role[] = ["ADMIN", "PERANGKAT_DESA"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 401,
    });
  }

  if (!allowedRoles.includes(session.user.role as Role)) {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    const body = await req.json();

    let items = body;
    if (
      body &&
      typeof body === "object" &&
      "data" in body &&
      Array.isArray(body.data)
    ) {
      items = body.data;
    }

    if (!Array.isArray(items)) {
      return handleResponse({
        success: false,
        message:
          "Request body harus berupa array atau object dengan properti 'data' berisi array",
        status: 400,
      });
    }

    const parsed = dataMasterArraySchema.safeParse(items);
    if (!parsed.success) return handleZodValidation(parsed);

    const data = parsed.data.map((item) => ({
      ...item,
      diprosesOlehId: session.user.id,
    }));

    // --- PROSES SATU PER SATU TANPA TRANSAKSI ---
    const successCount = { value: 0 };
    const errors: { row: number; message: string }[] = [];

    for (let i = 0; i < data.length; i++) {
      try {
        await prisma.dataMaster.create({ data: data[i] });
        successCount.value++;
      } catch (err: any) {
        if (err && typeof err === "object" && "code" in err) {
          const code = err.code as string;
          let message = "";
          switch (code) {
            case "P2002": {
              let fields = "";
              const meta = (err as any).meta;
              if (meta?.target) {
                fields = Array.isArray(meta.target)
                  ? meta.target.join(", ")
                  : String(meta.target);
              } else {
                const msg: string = err.message || "";
                const match = msg.match(/fields:\s*\(([^)]+)\)/i);
                if (match) {
                  fields = match[1]
                    .split(",")
                    .map((f: string) => f.trim().replace(/[`'"]/g, ""))
                    .join(", ");
                }
              }
              if (!fields) fields = "unknown";
              message = `Duplikat pada kolom: ${fields}`;
              break;
            }
            case "P2003":
              message = "Relasi foreign key tidak valid";
              break;
            case "P2000":
              message = "Nilai field terlalu panjang";
              break;
            default:
              message = `Error database (${code})`;
          }
          errors.push({ row: i + 1, message });
        } else {
          errors.push({
            row: i + 1,
            message: err.message || "Gagal menyimpan",
          });
        }
      }
    }

    // --- RESPONS ---
    if (errors.length > 0) {
      return handleResponse({
        success: successCount.value > 0,
        message:
          successCount.value > 0
            ? `${successCount.value} data berhasil, ${errors.length} gagal.`
            : "Semua data gagal diimport.",
        data: { count: successCount.value, errors },
        status: successCount.value > 0 ? 201 : 409,
      });
    }

    return handleResponse({
      success: true,
      message: `${successCount.value} data berhasil ditambahkan`,
      data: { count: successCount.value },
      status: 201,
    });
  } catch (err: any) {
    console.error("[IMPORT_DATA_MASTER_POST]", err);
    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }
    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};
