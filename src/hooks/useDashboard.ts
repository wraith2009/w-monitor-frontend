
import { useQuery } from "@tanstack/react-query";
import { DashboardApi } from "../api/dashboard";

export const useDashboardMetrics = () => {
    return useQuery({
        queryKey: ["dashboardMetrics"],
        queryFn: DashboardApi.getDashboardMetrics,
        refetchInterval: 60000, // Refetch every minute
        staleTime: 300000, // Data is fresh for 5 minutes
    });
};
export const useUptimeTrend = () => {
    return useQuery({
        queryKey: ["uptimeTrend"],
        queryFn: DashboardApi.getUptimeTrend,
        refetchInterval: 60000,
        staleTime: 300000,
    });
};