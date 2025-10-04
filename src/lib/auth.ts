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
  role: "admin" | "perangkat";
  [key: string]: any; // Untuk properti lain
}

/**
 * Memeriksa JWT dari Header Authorization: Bearer
 * @param req Objek NextRequest
 * @returns Payload JWT yang sudah diverifikasi atau null jika gagal
 */
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
    // 3. Verifikasi token menggunakan Secret Key
    const { payload } = await jose.jwtVerify(accessToken, ACCESS_SECRET);

    // 4. Kembalikan payload yang sudah di-verify
    return payload as JWTPayload;
  } catch (err) {
    // Token tidak valid (expired, signature salah, dll.)
    console.error("API Token Verification Failed:", err);
    return null;
  }
}
