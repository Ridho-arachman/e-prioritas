// handleZodValidation.ts
import { ZodTypeAny } from "zod";
import { extractErrors } from "./extractErrors";
import { handleResponse } from "./handleResponse";

export const handleZodValidation = <T extends ZodTypeAny>(
  parsed: ReturnType<T["safeParse"]>,
) => {
  return handleResponse({
    success: false,
    message: "Validasi gagal",
    errors: extractErrors(parsed),
    status: 400,
  });
};
