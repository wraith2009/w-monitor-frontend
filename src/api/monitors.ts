import { api } from './auth';
export type MonitorStatus = 'UP' | 'DOWN' | 'DEGRADED';


export interface Monitor {
    id: number;
    slug: string;
    websiteName: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    expectedStatus: number;
    interval: number;
    timeout: number;
    isPaused: boolean;
    regions: string[];
    lastCheckedAt: string;
    userId: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    status?: MonitorStatus;       // optional, for UI state
    uptimePercentage?: number;              // e.g. 99.95
    averageResponseTime?: number;        // e.g. 210ms
}

// Omit fields that are server-generated or not needed during creation
export type CreateMonitorData = Omit<
    Monitor,
    | 'id'
    | 'slug'
    | 'userId'
    | 'lastCheckedAt'
    | 'createdAt'
    | 'updatedAt'
    | 'isDeleted'
    | 'status'
    | 'uptime'
    | 'responseTime'
>;
export interface MonitorMetrics {
    monitorId: number;
    monitorName: string;
    monitorUrl: string;
    overallUptime: number; // percentage e.g., 100.0
    averageResponseTime: number; // in ms, can be float
    activeMonitorsByRegion: Record<string, number>; // region → count
    totalIncidents: number;
    totalChecks: number;
    successfulChecks: number;
}
export interface MonitorRegionStat {
    region: string;             // e.g., "us-east-1"
    uptime: number;             // percentage, e.g., 100
    avgResponse: number;        // in milliseconds
    status: "Up" | "Down" | "Degraded" | string; // allow flexibility
}

export interface MonitorRegionalMetrics {
    region: string;
    uptime: number;
    avgResponse: number;
    regionStats: MonitorRegionStat[];
}

// For updates, everything is optional except `id`
export interface UpdateMonitorData extends Partial<CreateMonitorData> {
    id: number;
}

export const monitorsApi = {
    getMonitors: async (): Promise<Monitor[]> => {
        const response = await api.get('/get-monitor');
        return response.data.data;
    },


    createMonitor: async (data: CreateMonitorData): Promise<Monitor> => {
        const response = await api.post('/register-monitor', data);
        return response.data;
    },

    updateMonitor: async (data: UpdateMonitorData): Promise<Monitor> => {
        const { id, ...updateData } = data;
        const response = await api.put(`/update-monitor/${id}`, updateData);
        return response.data.data;
    },

    deleteMonitor: async (id: string): Promise<void> => {
        const response = await api.put(`/delete-monitor/${id}`, { isDeleted: true });
        return response.data.data;
    },

    getMonitorStatsBySlug: async (slug: string): Promise<MonitorMetrics> => {
        const response = await api.get(`/websites/stats/${slug}`);
        return response.data.data;
    },
    getRegionStatsByMonitorSlug: async (slug: string): Promise<MonitorRegionalMetrics> => {
        const response = await api.get(`/websites/region-stats/${slug}`);
        return response.data.data;
    },
    getUptimeTrendBySlug: async (slug: string): Promise<{
        monitorId: number;
        monitorName: string;
        monitorUrl: string;
        trend: { hour: string; uptime: number }[];
    }> => {
        const response = await api.get(`/websites/uptime-trend/${slug}`);
        return response.data.data;
    }
}