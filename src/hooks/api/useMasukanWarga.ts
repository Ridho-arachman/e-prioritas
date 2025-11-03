import { create } from "domain";
import { useFetch } from "../useFetch";
import { useMutation } from "../useMutation";

const useCreateMasukanWarga = () => {
  const { error, execute, loading } = useMutation("post");
  return { error, execute, loading };
};

const useGetAllMasukanWarga = (
  q?: string,
  status?: string,
  kategoriId?: string,
  verifiedByUserId?: string,
  createdAt?: string
) => {
  const { error, data, isLoading, refresh } = useFetch("/protected/masukan", {
    params: {
      q,
      status,
      kategoriId,
      verifiedByUserId,
      createdAt,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { error, data, isLoading, refresh };
};

export { useCreateMasukanWarga, useGetAllMasukanWarga };
