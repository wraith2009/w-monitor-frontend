import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { monitorsApi } from '../api/monitors';
import type { CreateMonitorData } from '../api/monitors';
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
        mutationFn: monitorsApi.updateMonitor,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['monitors'] });
            queryClient.invalidateQueries({ queryKey: ['monitor', data.id] });
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
        mutationFn: monitorsApi.deleteMonitor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['monitors'] });
            toast.success('Monitor deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete monitor');
        },
    });
};


