// Type for the nested pagination object
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  has_next: boolean;
  has_prev: boolean;
}

// Generic type for any API response that follows this structure
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[]; // `T` is a placeholder for your data's type, like `Agent`
  pagination: PaginationInfo;
}
