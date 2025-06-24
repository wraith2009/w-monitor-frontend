import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001/api';
import { injectToken } from '@/utils/InjectToken';
import { useAuthStore } from '@/stores/authStore';
// Ensure you have the correct path to your auth store
import { toast } from 'sonner';
export const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(injectToken);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.error('Session expired. Please log in again.');

            const authStore = useAuthStore.getState(); // Access outside React
            authStore.logout(); // Clear state
            window.location.href = '/signin'; // Redirect
        }
        return Promise.reject(error);
    }
);

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post('/signin', credentials);
        return response.data.data;
    },

    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        const response = await api.post('/register', credentials);
        return response.data;
    },
};