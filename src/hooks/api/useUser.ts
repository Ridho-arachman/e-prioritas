import { useFetch } from "../useFetch";

const useGetAllUser = () => {
  const { data, error, isLoading, refresh } = useFetch("/protected/user", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { data, error, isLoading, refresh };
};

export { useGetAllUser };
