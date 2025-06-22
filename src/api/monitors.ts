import { api } from './auth';
export type MonitorStatus = 'up' | 'down' | 'degraded';

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
    uptime?: number;              // e.g. 99.95
    responseTime?: number;        // e.g. 210ms
}

export interface CreateMonitorData {
    websiteName: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    expectedStatus: number;
    interval: number;
    timeout: number;
    isPaused?: boolean;
    regions?: string[];
}

export interface UpdateMonitorData extends Partial<CreateMonitorData> {
    id: string;
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
        return response.data;
    },

    deleteMonitor: async (id: string): Promise<void> => {
        await api.put(`/delete-monitor/${id}`, { isDeleted: true });
    },


};