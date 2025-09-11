import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";

async function logoutUser(url: string) {
  return fetcher(url, {
    method: "POST",
    credentials: "include",
  });
}

export function useLogout() {
  return useSWRMutation("/api/auth/logout", logoutUser);
}
