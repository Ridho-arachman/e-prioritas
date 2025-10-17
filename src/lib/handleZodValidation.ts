// /lib/handleZodValidation.ts
import { extractErrors } from "./extractErrors";

export const handleZodValidation = (parsed: any, headers?: HeadersInit) => {
  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal",
      errors: extractErrors(parsed),
      status: 400,
      headers,
    };
  }
  return null;
};
