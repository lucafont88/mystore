export interface ApiErrorResponse {
  message: string;
  code?: string;
  status: number;
}

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}
