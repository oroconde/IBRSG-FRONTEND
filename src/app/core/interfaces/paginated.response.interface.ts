/**
 * Respuesta paginada.
 */
export interface IPaginatedResponse<T> {
  data: {
    docs: T[];
    order: string;
    page: number;
    limit: number;
    totalDocs: number;
    totalPages: number;
  };
  statusCode: number;
  statusText: string;
  description: string;
}
