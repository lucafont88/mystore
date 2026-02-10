import { api } from './api';
import { LoginInput, RegisterInput } from '../lib/validators';
import { useAuthStore } from '../stores/authStore';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
}

export const authService = {
  login: async (data: LoginInput) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    useAuthStore.getState().login(response.user, response.token);
    return response;
  },

  register: async (data: RegisterInput) => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    useAuthStore.getState().login(response.user, response.token);
    return response;
  },

  logout: () => {
    useAuthStore.getState().logout();
  },
};
