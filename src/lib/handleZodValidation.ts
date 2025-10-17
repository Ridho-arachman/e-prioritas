// /lib/handleZodValidation.ts
import { extractErrors } from "./extractErrors";
import { handleResponse } from "./responseHandler";

export const handleZodValidation = (parsed: any, headers?: HeadersInit) => {
  return handleResponse({
    success: false,
    message: "Validasi gagal",
    errors: extractErrors(parsed),
    status: 400,
    headers,
  });
};
