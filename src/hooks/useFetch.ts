"use client";
import useSWR from "swr";
import { api } from "@/lib/axios";

type FetchConfig = {
  headers?: Record<string, string>;
  params?: Record<string, any>;
};

export const useFetch = (url: string, config: FetchConfig = {}) => {
  const fetcher = async (url: string) => {
    const res = await api.get(url, config);
    return res.data;
  };

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  };
};
