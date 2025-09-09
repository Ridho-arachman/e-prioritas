import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import z from "zod";
import { createUserSchema } from "@/schema/sign-up";

async function registerUser(
  url: string,
  { arg }: { arg: z.infer<typeof createUserSchema> }
) {
  return fetcher(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
}

export function useRegister() {
  return useSWRMutation("/api/auth/register", registerUser);
}
