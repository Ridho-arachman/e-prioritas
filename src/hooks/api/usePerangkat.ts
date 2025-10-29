import { useFetch } from "../useFetch";
import { useMutation } from "../useMutation";

const useCreatePerangkat = () => {
  const { error, execute, loading } = useMutation("post");
  return { error, execute, loading };
};

const useGetAllPerangkat = (q?: string, isActive?: string | boolean) => {
  const { data, error, isLoading, refresh } = useFetch("/protected/perangkat", {
    params: {
      q,
      isActive,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { data, error, isLoading, refresh };
};

const useGetPerangkatById = (id: string) => {
  const { data, error, isLoading, refresh } = useFetch(
    `/protected/perangkat/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return { data, error, isLoading, refresh };
};

const useEditPerangkat = () => {
  const { error, execute, loading } = useMutation("patch");
  return { error, execute, loading };
};

const useDeletePerangkat = () => {
  const { error, execute, loading } = useMutation("delete");
  return { error, execute, loading };
};

export {
  useGetAllPerangkat,
  useGetPerangkatById,
  useEditPerangkat,
  useDeletePerangkat,
  useCreatePerangkat,
};
