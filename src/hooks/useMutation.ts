// hooks/useMutation.ts
import { useState } from "react";
import { api } from "@/lib/axios";
import { mutate } from "swr";

type MutationMethod = "post" | "put" | "delete" | "patch";

// hooks/useMutation.ts (DITINGKATKAN)

export const useMutation = (method: MutationMethod = "post") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Perubahan: execute sekarang menerima 'url' sebagai parameter PERTAMA
  const execute = async (
    url: string,
    payload?: any,
    config?: any,
    mutateKey?: string
  ) => {
    try {
      setLoading(true);

      let res;
      if (method === "delete") {
        // Axios delete dapat menerima URL, dan body di config.data
        res = await api.delete(url, { data: payload, ...config });
      } else {
        // Untuk POST/PUT/PATCH, URL sudah lengkap
        res = await api[method](url, payload, config);
      }

      // jika disediakan key SWR, lakukan revalidate otomatis
      if (mutateKey) {
        mutate(mutateKey);
      }

      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
