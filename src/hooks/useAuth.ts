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

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            toast.success('Account created successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Registration failed');
        },
    });
};

export const useResendVerificationEmail = () => {

    return useMutation({
        mutationFn: authApi.resendVerificationEmail,
        onSuccess: () => {
            toast.success('Verification email sent successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to resend verification email');
        },
    });
}




export const useForgotPassword = () => {
    return useMutation({
        mutationFn: authApi.forgotPassword,
        onSuccess: () => {
            toast.success('Password reset link sent to your email!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to send reset link');
        },
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: authApi.resetPassword,
        onSuccess: () => {
            toast.success('Password has been reset successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to reset password');
        },
    });
};
