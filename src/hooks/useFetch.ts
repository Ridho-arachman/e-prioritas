"use client";
import useSWR, { SWRConfiguration } from "swr";
import { api } from "@/lib/axios";

type FetchConfig = {
  headers?: Record<string, string>;
  params?: Record<string, any>;
};

export const useFetch = (
  url: string,
  config: FetchConfig = {},
  swrConfig?: SWRConfiguration
) => {
  const key = [
    url,
    JSON.stringify(config.params ?? {}),
    JSON.stringify(config.headers ?? {}),
  ];

  const { data, error, isLoading, mutate } = useSWR(
    key,
    async () => {
      const res = await api.get(url, config);
      return res.data;
    },
    {
      ...swrConfig,
    }
  );

  return { data, error, isLoading, refresh: mutate };
};
