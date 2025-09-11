import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import z from "zod";
import { loginSchema } from "@/schema/login";

async function loginUser(
  url: string,
  { arg }: { arg: z.infer<typeof loginSchema> }
) {
  return fetcher(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
    credentials: "include",
  });
}

export function useLogin() {
  return useSWRMutation("/api/auth/login", loginUser);
}
