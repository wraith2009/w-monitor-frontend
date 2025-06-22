import { api } from './auth';

export interface Monitor {
    id: string;
    name: string;
    url: string;
    status: 'up' | 'down' | 'degraded';
    uptime: number;
    responseTime: number;
    createdAt: string;
    updatedAt: string;
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
        return response.data;
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