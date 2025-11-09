import { useFetch } from "../useFetch";

const useStatsDashboard = () => {
  const { data, error, isLoading, refresh } = useFetch(
    "/protected/dashboard/stats",
    {}
  );
  return { data: data?.data || [], error, isLoading, refresh };
};

const useRecentActivities = () => {
  const { data, error, isLoading, refresh } = useFetch(
    "/protected/dashboard/activities",
    {}
  );

  return {
    data: data?.data || [],
    error,
    isLoading,
    refresh,
  };
};

export { useStatsDashboard, useRecentActivities };
