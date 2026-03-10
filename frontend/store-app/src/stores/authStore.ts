import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProfileStatus = 'COMPLETE' | 'PENDING_PROFILE' | 'PENDING_IDENTITY';

export interface User {
  id: string;
  email: string;
  role: string;
  profileStatus?: ProfileStatus;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setProfileStatus: (status: ProfileStatus) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setProfileStatus: (status) =>
        set((state) => ({
          user: state.user ? { ...state.user, profileStatus: status } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
