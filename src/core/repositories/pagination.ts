export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface PaginationResult<T> {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}
