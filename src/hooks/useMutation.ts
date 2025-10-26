import { useState } from "react";
import { api } from "@/lib/axios";
import { mutate } from "swr";

type MutationMethod = "post" | "put" | "delete" | "patch";

export const useMutation = (method: MutationMethod = "post") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (
    url: string,
    payload?: any,
    config?: any,
    mutateKey?: string
  ): Promise<{ data: any | null; error: string | null }> => {
    try {
      setLoading(true);
      setError(null);

      let res;
      if (method === "delete") {
        // axios.delete pakai data di config
        res = await api.delete(url, { data: payload, ...config });
      } else {
        res = await api[method](url, payload, config);
      }

      if (mutateKey) {
        mutate(mutateKey);
      }

      return { data: res.data, error: null };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      return { data: null, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
