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

const useActivityStats = () => {
  const { data, error, isLoading, refresh } = useFetch(
    "/protected/dashboard/activities-stats",
    {}
  );

  return { data: data?.data || [], error, isLoading, refresh };
};

const useDashboardCharts = () => {
  const { data, error, isLoading } = useFetch(
    "/protected/dashboard/charts",
    {}
  );

  return {
    data: data?.data || { monthlyData: [], dataMasterCategory: [] },
    error,
    isLoading,
  };
};

export {
  useStatsDashboard,
  useRecentActivities,
  useActivityStats,
  useDashboardCharts,
};
