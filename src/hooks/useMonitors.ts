import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { monitorsApi } from '../api/monitors';
import type { CreateMonitorData, UpdateMonitorData } from '../api/monitors';
import { toast } from 'sonner';

export const useMonitors = () => {
    return useQuery({
        queryKey: ['monitors'],
        queryFn: monitorsApi.getMonitors,
    });
};


export const useCreateMonitor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateMonitorData) => monitorsApi.createMonitor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['monitors'] });
            toast.success('Monitor created successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to create monitor');
        },
    });
};
export const useUpdateMonitor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateMonitorData) => monitorsApi.updateMonitor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['monitors'] });
            toast.success('Monitor updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update monitor');
        },
    });
};

export const useDeleteMonitor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => monitorsApi.deleteMonitor(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['monitors'] });
            toast.success('Monitor deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete monitor');
        },
    });
};


