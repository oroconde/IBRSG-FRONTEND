import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IPaginatedResponse } from '../interfaces/paginated.response.interface';
import { IRequestOptions } from '../interfaces/request.options.interface';

/**
 * BaseEntity: toda entidad debe tener al menos una propiedad 'id'.
 */
export interface BaseEntity {
  id: number | string;
}

/**
 * Servicio CRUD genérico basado en HttpClient y RxJS.
 */
export abstract class BaseApiService<T extends BaseEntity> {
  protected constructor(protected readonly http: HttpClient) {}

  /**
   * Define la URL base del recurso (e.g. '/api/users')
   */
  protected abstract readonly baseUrl: string;

  create<U extends Partial<T>>(
    data: U,
    options: IRequestOptions = {},
  ): Observable<T> {
    return this.http
      .post<T>(this.baseUrl, data, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  findAll(options: IRequestOptions = {}): Observable<IPaginatedResponse<T>> {
    return this.http
      .get<IPaginatedResponse<T>>(this.baseUrl, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  findOne(id: number | string, options: IRequestOptions = {}): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${id}`, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  update<U extends Partial<T>>(
    id: number | string,
    data: U,
    options: IRequestOptions = {},
  ): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${id}`, data, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  remove(id: number | string, options: IRequestOptions = {}): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  /**
   * Carga un archivo con barra de progreso
   */
  uploadFile(
    endpoint: string, // ejemplo: /upload o /{id}/document
    formData: FormData,
    options: IRequestOptions = {},
  ): Observable<number | 'done'> {
    return this.http
      .post(`${this.baseUrl}${endpoint}`, formData, {
        reportProgress: true,
        observe: 'events',
        ...this.buildOptions(options),
      })
      .pipe(
        map((event: HttpEvent<unknown>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              return Math.round((event.loaded / (event.total ?? 1)) * 100);
            case HttpEventType.Response:
              return 'done';
            default:
              return 0;
          }
        }),
        catchError(this.handleError),
      );
  }

  /**
   * Construye los headers y params personalizados.
   */
  private buildOptions({ params = {}, headers = {} }: IRequestOptions = {}) {
    return {
      params: new HttpParams({ fromObject: params }),
      headers: new HttpHeaders(headers),
    };
  }

  /**
   * Manejo de errores centralizado.
   */
  protected handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(
      () => new Error(error.message || 'Unexpected error occurred.'),
    );
  }
}
