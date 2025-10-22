import { useFetch } from "../useFetch";
import { useMutation } from "../useMutation";

const useCreateKategori = () => {
  const { error, execute, loading } = useMutation("post");
  return { error, execute, loading };
};

const useKategoriAll = (search?: string) => {
  const { data, error, isLoading, refresh } = useFetch("/protected/kategori", {
    params: {
      search: search,
    },
  });
  return { data, error, isLoading, refresh };
};

const useKategoriById = (id: string) => {
  const { data, error, isLoading, refresh } = useFetch(
    `/protected/kategori/${id}`
  );
  return { data, error, isLoading, refresh };
};

const useEditKategori = () => {
  const { error, execute, loading } = useMutation("put");
  return { error, execute, loading };
};

const useDeleteKategori = () => {
  const { error, execute, loading } = useMutation("delete");
  return { error, execute, loading };
};

export {
  useKategoriAll,
  useKategoriById,
  useEditKategori,
  useDeleteKategori,
  useCreateKategori,
};
