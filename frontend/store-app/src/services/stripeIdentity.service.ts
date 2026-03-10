import { api } from './api';

export const stripeIdentityService = {
  createSession: (): Promise<{ clientSecret: string }> =>
    api.post<{ clientSecret: string }>('/user-data/vendor/identity/session'),

  checkStatus: (): Promise<{ status: string }> =>
    api.get<{ status: string }>('/user-data/vendor/identity/status'),
};
