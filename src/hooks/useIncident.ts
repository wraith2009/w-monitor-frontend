import { useQuery } from "@tanstack/react-query";
import { IncidentApi } from "@/api/incidents";
import { useMutation } from "@tanstack/react-query";
export const useIncidents = () => {
    return useQuery({
        queryKey: ["incidents"],
        queryFn: IncidentApi.getIncidents,
        refetchInterval: 60000, // Refetch every minute
        staleTime: 300000, // Data is fresh for 5 minutes
    });
}

export const useIncidentById = (incidentId: number) => {
    return useQuery({
        queryKey: ["incident", incidentId],
        queryFn: () => IncidentApi.getIncidentById(incidentId),
        staleTime: 300000, // Data is fresh for 5 minutes
    });
}
export const useIncidentSummary = (monitorId: number) => {
    return useQuery({
        queryKey: ["incidentSummary", monitorId],
        queryFn: () => IncidentApi.getIncidentSummary(monitorId),
        staleTime: 300000, // Data is fresh for 5 minutes
    });
}
export const useIncidentByMonitorId = (monitorId: number) => {
    return useQuery({
        queryKey: ["incidentByMonitorId", monitorId],
        queryFn: () => IncidentApi.getIncidentByMonitorId(monitorId),
        staleTime: 300000, // Data is fresh for 5 minutes
    });
}

export const useResolveIncident = () => {
    return useMutation({
        mutationFn: (incidentId: number) => IncidentApi.resolveIncident(incidentId),
        onSuccess: () => {
            // Optionally, you can invalidate queries to refetch incidents
            // queryClient.invalidateQueries({ queryKey: ["incidents"] });
        },
    });
}