import { useQuery } from "@tanstack/react-query";
import { logsApi } from "@/api/logs";
import type { LogEntry } from "@/api/logs";

export const useLogsByMonitor = (monitorId: number) => {
    return useQuery<LogEntry[]>({
        queryKey: ['logs', monitorId],
        queryFn: async () => {
            const logs = await logsApi.getLogsByMonitor(monitorId);
            return logs;
        },
        enabled: !!monitorId,
    });
};

export const useLogs = () => {
    return useQuery<LogEntry[]>({
        queryKey: ['logs'],
        queryFn: async () => {
            const logs = await logsApi.getLogs();
            return logs;
        },
    });
};