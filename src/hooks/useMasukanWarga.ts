import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import z from "zod";

async function createMasukanWarga(
  url: string,
  { arg }: { arg: z.infer<typeof createMasukanWargaSchema> }
) {
  return fetcher(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
}

export function useRegister() {
  return useSWRMutation("/api/masukan-warga", createMasukanWarga);
}
