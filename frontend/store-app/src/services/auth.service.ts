import { api } from './api';
import { LoginInput, RegisterInput } from '../lib/validators';
import { useAuthStore } from '../stores/authStore';

export interface RegisterResponse {
  id: string;
  email: string;
  role: string;
  profileStatus: 'COMPLETE' | 'PENDING_PROFILE';
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: string;
    profileStatus: 'COMPLETE' | 'PENDING_PROFILE';
  };
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  login: async (data: LoginInput) => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    useAuthStore.getState().login(response.user, response.accessToken);
    return response;
  },

  register: async (data: RegisterInput) => {
    const { email, password, role } = data;
    const response = await api.post<RegisterResponse>('/auth/register', { email, password, role });
    // After registration, auto-login to get tokens
    const loginResponse = await api.post<LoginResponse>('/auth/login', { email, password });
    useAuthStore.getState().login(loginResponse.user, loginResponse.accessToken);
    return response;
  },

  checkEmail: (email: string) =>
    api.get<{ exists: boolean }>(`/auth/check-email?email=${encodeURIComponent(email)}`),

  sendOtp: (email: string, password: string, role: string) =>
    api.post<{ message: string }>('/auth/register/send-otp', { email, password, role }),

  verifyOtp: async (email: string, otp: string, password: string) => {
    const response = await api.post<RegisterResponse>('/auth/register/verify-otp', { email, otp });
    // Auto-login dopo verifica OTP riuscita
    const loginResponse = await api.post<LoginResponse>('/auth/login', { email, password });
    useAuthStore.getState().login(loginResponse.user, loginResponse.accessToken);
    return response;
  },

  logout: () => {
    useAuthStore.getState().logout();
  },

  getCurrentUser: () => useAuthStore.getState().user,
};
