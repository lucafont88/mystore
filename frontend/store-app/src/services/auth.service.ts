import { api } from './api';
import { LoginInput, RegisterInput } from '../lib/validators';
import { useAuthStore } from '../stores/authStore';

export interface RegisterResponse {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: string;
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

  logout: () => {
    useAuthStore.getState().logout();
  },
};
