// import { WritableSignal } from '@angular/core';
// import { Observable } from 'rxjs';
// import { IPaginatedResponse } from '../interfaces/paginated.response.interface';

// /**
//  * Carga datos paginados desde un observable y actualiza los signals de lista y total de páginas.
//  *
//  * @template T - Tipo de datos contenidos en `docs`.
//  * @param serviceFn - Función que devuelve un observable paginado.
//  * @param listSignal - Signal para almacenar los documentos (`docs`).
//  * @param totalPagesSignal - Signal para almacenar el total de páginas.
//  * @param options - Parámetros para el servicio (page, limit, etc.).
//  * @param errorMsg - Mensaje personalizado para logs de error.
//  * @param [rawParams={}] - Parámetros adicionales para el servicio.
//  */
// export function loadPaginated<T>(
//   serviceFn: (params: Record<string, any>) => Observable<IPaginatedResponse<T>>,
//   listSignal: WritableSignal<T[]>,
//   totalPagesSignal: WritableSignal<number>,
//   options: Record<string, any> = {},
//   errorMsg = 'Error al cargar datos'
// ): void {
//   serviceFn(options).subscribe({
//     next: (res) => {
//       listSignal.set(res.data.docs);
//       totalPagesSignal.set(res.data.totalPages);
//     },
//     error: (err) => {
//       console.error(`[${errorMsg}]`, err);
//     },
//   });
// }

// // export function loadPaginated<T>(
// //   serviceFn: (
// //     params: Record<string, string>
// //   ) => Observable<IPaginatedResponse<T>>,
// //   listSignal: WritableSignal<T[]>,
// //   totalPagesSignal: WritableSignal<number>,
// //   rawParams: Record<string, any> = {},
// //   errorMsg = 'Error al cargar datos'
// // ): void {
// //   // Convertimos todos los valores a string, como lo hace Angular normalmente
// //   const params: Record<string, string> = Object.entries(rawParams).reduce(
// //     (acc, [key, value]) => {
// //       if (value !== null && value !== undefined) {
// //         acc[key] = String(value);
// //       }
// //       return acc;
// //     },
// //     {} as Record<string, string>
// //   );

// //   serviceFn(params).subscribe({
// //     next: (res) => {
// //       listSignal.set(res.data.docs);
// //       totalPagesSignal.set(res.data.totalPages);
// //     },
// //     error: (err) => {
// //       console.error(`[${errorMsg}]`, err);
// //     },
// //   });
// // }
