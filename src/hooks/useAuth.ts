import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'sonner';

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuthStore();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            console.log('Login successful:', data);
            login(data.token, data.user);
            toast.success('Successfully logged in!');

            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Login failed');
        },
    });
};

export const useRegister = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            login(data.token, data.user);
            toast.success('Account created successfully!');
            navigate('/dashboard', { replace: true });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Registration failed');
        },
    });
};

