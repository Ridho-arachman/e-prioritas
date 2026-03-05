import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface ResponseProps<T = unknown, E = unknown, M = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: E;
  status?: number;
  meta?: M;
  headers?: HeadersInit;
}

export function handleResponse<T = unknown, E = unknown, M = unknown>({
  success,
  message = "Success",
  data,
  errors,
  status = 200,
  meta,
  headers,
}: ResponseProps<T, E, M>) {
  // Body bertipe generic
  const body: {
    success: boolean;
    message: string;
    data?: T;
    errors?: E;
    meta?: M;
  } = {
    success,
    message,
  };
  if (data !== undefined) body.data = data;
  if (errors !== undefined) body.errors = errors;
  if (meta !== undefined) body.meta = meta;

  return NextResponse.json(body, { status, headers });
}
