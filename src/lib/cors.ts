import { NextRequest, NextResponse } from "next/server";

interface CorsOptions {
  allowedOrigins?: string[];
}

export function cors(req: NextRequest, options?: CorsOptions) {
  const defaultOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    "http://localhost:3000",
  ];

  const allowedOrigins = options?.allowedOrigins ?? defaultOrigins;

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

  // Handle preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers });
  }

  return headers;
}
