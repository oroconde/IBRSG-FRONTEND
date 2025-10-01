/**
 * Configuración opcional para peticiones (params y headers).
 */
export interface IRequestOptions {
  //params?: Record<string, string | number | boolean | undefined>;
  params?: Record<
    string,
    string | number | boolean | readonly (string | number | boolean)[]
  >;
  headers?: Record<string, string>;
}
