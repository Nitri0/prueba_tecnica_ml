export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
