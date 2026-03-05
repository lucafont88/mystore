import { useAuthStore } from '../stores/authStore';
import { ApiError, RequestOptions } from '../types/api';

const BASE_URL = '/api/v1';

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...rest } = options;
  
  // Construct URL with query params
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  const fullUrl = `${BASE_URL}${url}${queryString}`;

  // Get token from authStore
  const token = useAuthStore.getState().token;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...rest,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  try {
    const response = await fetch(fullUrl, config);

    if (response.status === 204) {
      return undefined as T;
    }

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        useAuthStore.getState().logout();
      }
      const message =
        data.message ||
        data.error ||
        (Array.isArray(data.errors) ? data.errors[0]?.msg : null) ||
        'Something went wrong';
      throw new ApiError(message, response.status, data.code);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Network Error', 500);
  }
}

export const api = {
  get: <T>(url: string, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'GET' }),
  
  post: <T>(url: string, data?: any, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'POST', body: JSON.stringify(data) }),
  
  put: <T>(url: string, data?: any, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  
  delete: <T>(url: string, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'DELETE' }),
};
