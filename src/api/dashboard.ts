
import { api } from "./auth";
export interface dashboardMetrics {
    overallUptime: number;
    averageResponseTime: number;
    activeMonitorsByRegion: Record<string, number>;
    totalIncidents: number;
}
export interface UptimeChartData {
    hour: string;
    uptime: number;
}

export const DashboardApi = {
    getDashboardMetrics: async (): Promise<dashboardMetrics> => {
        const response = await api.get('/dashboard/stats');
        return response.data;
    },

    getUptimeTrend: async (): Promise<UptimeChartData[]> => {
        const response = await api.get('/dashboard/uptime-trend');
        return response.data;
    }
}