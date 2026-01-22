import { useFetch } from "../useFetch";
import { useMutation } from "../useMutation";

const useCreateDataMaster = () => {
  const { error, execute, loading } = useMutation("post");
  return { error, execute, loading };
};

const useCreateDataMasterMany = () => {
  const { error, execute, loading } = useMutation("post");
  return { error, execute, loading };
};

const useGetAllDataMaster = (
  q?: string,
  jenisData?: string,
  lokasiRt?: string,
  lokasiRw?: string,
  nilai?: string,
  updatedAt?: string
) => {
  const { error, data, isLoading, refresh } = useFetch(
    "/protected/data-master",
    {
      params: {
        q,
        jenisData,
        lokasiRt,
        lokasiRw,
        nilai,
        updatedAt,
      },
    }
  );
  return { error, data, isLoading, refresh };
};

const useGetDeltailDataMaster = (id: string) => {
  const { error, data, isLoading, refresh } = useFetch(
    `/protected/data-master/${id}`
  );
  return { error, data, isLoading, refresh };
};

const useEditDataMaster = () => {
  const { error, execute, loading } = useMutation("put");
  return { error, execute, loading };
};

const useDeleteDataMaster = () => {
  const { error, execute, loading } = useMutation("delete");
  return { error, execute, loading };
};

export {
  useCreateDataMaster,
  useGetAllDataMaster,
  useDeleteDataMaster,
  useGetDeltailDataMaster,
  useEditDataMaster,
  useCreateDataMasterMany,
};
