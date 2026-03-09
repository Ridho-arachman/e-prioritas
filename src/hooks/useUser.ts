// hooks/useUser.ts
import { useEffect, useState } from "react";
import { useGet } from "./useApi";
import { useUserStore } from "@/stores/userStore";

export const useUser = () => {
  const { user, setUser } = useUserStore();
  const [shouldFetch, setShouldFetch] = useState(!user);
  const { data, isLoading } = useGet(
    shouldFetch ? "/protected/user/getuser" : "",
  );

  useEffect(() => {
    if (data) {
      setUser(data);
      setShouldFetch(false);
    }
  }, [data, setUser]);

  return { user, isLoading: isLoading && shouldFetch };
};
