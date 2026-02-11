import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../services/api';
import { useAuthStore } from '../stores/authStore';

describe('api service', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    useAuthStore.getState().logout();
  });

  it('should add Authorization header if token exists', async () => {
    const token = 'test-token';
    const user = { id: '1', email: 'test@test.com', firstName: 'T', lastName: 'T' };
    useAuthStore.getState().login(user, token);
    
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'success' }),
    });

    await api.get('/test');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      })
    );
  });

  it('should throw ApiError on non-ok response', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not Found' }),
    });

    await expect(api.get('/not-found')).rejects.toThrow('Not Found');
  });

  it('should call logout on 401 response', async () => {
    const logoutSpy = vi.spyOn(useAuthStore.getState(), 'logout');
    
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    });

    try {
      await api.get('/protected');
    } catch (e) {
      // Expected error
    }

    expect(logoutSpy).toHaveBeenCalled();
  });
});
