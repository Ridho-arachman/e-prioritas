import { useMutation } from "../useMutation";

const useLogin = () => {
  const { error, execute, loading } = useMutation("post");
  return { error, execute, loading };
};

const useLogout = () => {
  const { error, execute, loading } = useMutation("post");
  return { error, execute, loading };
};

export { useLogin, useLogout };
