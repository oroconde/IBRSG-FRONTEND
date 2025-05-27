/**
 * Paginación genérica.
 */
export interface IaginationQuery {
  page?: number;
  limit?: number;
  order?: 'asc' | 'desc';
  sortBy?: string;
  select?: object;
}
