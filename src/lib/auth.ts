import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

// Pastikan variabel ACCESS_SECRET diinisialisasi dengan aman
const ACCESS_SECRET = new TextEncoder().encode(
  process.env.ACCESS_SECRET || "fallback-access-secret"
);

// Definisikan tipe payload yang diharapkan
interface JWTPayload {
  id: string;
  email: string;
  role: "ADMIN" | "PERANGKAT_DESA";
  [key: string]: any; // Untuk properti lain
}

export async function verifyApiToken(
  req: NextRequest
): Promise<JWTPayload | null> {
  const authHeader = req.headers.get("Authorization");

  // 1. Cek format Header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null; // Header tidak valid
  }

  // 2. Ambil token (hapus 'Bearer ')
  const accessToken = authHeader.split(" ")[1];

  try {
    const { payload } = await jose.jwtVerify(accessToken, ACCESS_SECRET);
    return payload as JWTPayload;
  } catch (err) {
    return null;
  }
}
