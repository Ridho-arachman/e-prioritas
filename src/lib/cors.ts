// lib/cors.ts
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  process.env.NEXT_PUBLIC_APP_URL, // domain app kamu sendiri
  "http://localhost:3000", // dev origin
  // tambahkan domain lain bila perlu
];

export function cors(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin);

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": isAllowed
      ? origin
      : allowedOrigins[0] || "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };

  // kalau request OPTIONS (preflight), langsung return tanpa lanjut ke handler
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers });
  }

  return headers;
}
