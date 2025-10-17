import { NextResponse } from "next/server";

interface ResponseProps {
  success: boolean;
  message: string;
  data?: any;
  errors?: any;
  status?: number;
  headers?: HeadersInit;
}

export function handleResponse({
  success,
  message,
  data,
  errors,
  status = 200,
  headers,
}: ResponseProps) {
  const body: any = { success, message };
  if (data !== undefined) body.data = data;
  if (errors !== undefined) body.errors = errors;

  return NextResponse.json(body, { status, headers });
}
