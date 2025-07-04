import { api } from "./auth";
export interface Incident {
    id: number
    monitorId: number
    startedAt: string
    resolvedAt: string | null
    status: "OPEN" | "RESOLVED"
    summary: string
    lastNotifiedAt: string | null
    createdAt: string
    updatedAt: string
    monitor?: {
        id: number
        websiteName: string
        url: string
    }
}

export interface IncidentSummary {
    totalIncidents: number
    openIncidents: number
    resolvedIncidents: number
    avgDowntimeMinutes: number
    totalDowntimeMinutes: number
}

export interface IncidentResponse {
    status: string
    statusCode: number
    message: string
    data: Incident[]
}

export interface IncidentSummaryResponse {
    status: string
    statusCode: number
    message: string
    data: IncidentSummary
}

export const IncidentApi = {
    getIncidents: async (): Promise<IncidentResponse> => {
        const response = await api.get('/incidents');
        return response.data.data;
    },

    getIncidentById: async (incidentId: number): Promise<Incident> => {
        const response = await api.get(`/incidents/${incidentId}`);
        return response.data.data;
    },

    getIncidentSummary: async (monitorId: number): Promise<IncidentSummaryResponse> => {
        const response = await api.get(`/incidents/summary/${monitorId}`);
        return response.data;
    },
    getIncidentByMonitorId: async (monitorId: number): Promise<IncidentResponse> => {
        const response = await api.get(`/incidents/timeline/${monitorId}`);
        return response.data;
    },
    resolveIncident: async (incidentId: number): Promise<Incident> => {
        const response = await api.patch(`/incidents/${incidentId}/resolve`);
        return response.data.data;
    }
}