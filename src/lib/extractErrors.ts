import { ZodError } from "zod";

export function extractErrors<T>(
  parseResult:
    | { success: true; data: T }
    | { success: false; error: ZodError<T> }
) {
  if (parseResult.success) return [];

  return parseResult.error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}
