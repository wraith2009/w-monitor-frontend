import { useAuthStore } from '@/stores/authStore';

export function injectToken(config: any) {
    const token = useAuthStore.getState().token;
    console.log('Injecting token:', token);
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}
