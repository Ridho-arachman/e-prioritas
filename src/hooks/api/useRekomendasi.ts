import { useFetch } from "../useFetch";
import { useMutation } from "../useMutation";

const useGetAllJudulRekomendasi = () => {
  const { data, error, isLoading, refresh } = useFetch(
    `/protected/rekomendasi`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return { data: data?.data || [], error, isLoading, refresh };
};

const useCreateRekomendasi = () => {
  const { error, execute, loading } = useMutation("post");
  return { error, execute, loading };
};

const useGetRekomendasiById = (id: string) => {
  const { data, error, isLoading, refresh } = useFetch(
    `/protected/rekomendasi/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return { data: data?.data, error, isLoading, refresh };
};

export {
  useGetAllJudulRekomendasi,
  useCreateRekomendasi,
  useGetRekomendasiById,
};
