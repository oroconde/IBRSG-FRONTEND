/**
 * Configuración opcional para peticiones (params y headers).
 */
export interface IRequestOptions {
  params?: Record<string, any>;
  headers?: Record<string, string>;
}
