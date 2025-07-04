import { api } from "./auth";

export interface LogEntry {
    id: number;
    monitorId: number;
    region: string;
    level: string;
    message: string;
    meta: meta;
    createdAt: string;
}
interface meta {
    responseTime: number;
    statusCode: number;
}
export const logsApi = {

    getLogs: async (): Promise<LogEntry[]> => {
        const response = await api.get('/monitor/logs');
        return response.data.data.logs;
    },
    getLogsByMonitor: async (monitorId: number): Promise<LogEntry[]> => {
        const response = await api.get(`/monitor/${monitorId}/logs`);
        return response.data.data.logs;
    }
}
