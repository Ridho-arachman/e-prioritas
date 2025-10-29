import { useFetch } from "../useFetch";
import { useMutation } from "../useMutation";

const useCreateKategori = () => {
  const { error, execute, loading } = useMutation("post");
  return { error, execute, loading };
};

const useGetAllKategori = (search?: string) => {
  const { data, error, isLoading, refresh } = useFetch("/protected/kategori", {
    params: {
      search: search,
    },
  });
  return { data, error, isLoading, refresh };
};

const useGetKategoriById = (id: string) => {
  const { data, error, isLoading, refresh } = useFetch(
    `/protected/kategori/${id}`
  );
  return { data, error, isLoading, refresh };
};

const useEditKategori = () => {
  const { error, execute, loading } = useMutation("patch");
  return { error, execute, loading };
};

const useDeleteKategori = () => {
  const { error, execute, loading } = useMutation("delete");
  return { error, execute, loading };
};

export {
  useGetAllKategori,
  useGetKategoriById,
  useEditKategori,
  useDeleteKategori,
  useCreateKategori,
};
