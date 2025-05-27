// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of, catchError, tap, map } from 'rxjs';

// export interface UserProfile {
//   id: number;
//   email: string;
//   role: 'ADMIN' | 'USER';
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   checkAuthStatus(): Observable<unknown> {
//     throw new Error('Method not implemented.');
//   }
//   private http = inject(HttpClient);
//   private user: UserProfile | null = null;

//   get isAuthenticated(): boolean {
//     return !!this.user;
//   }

//   get userRole(): 'ADMIN' | 'USER' | null {
//     return this.user?.role ?? null;
//   }

//   get userEmail(): string | null {
//     return this.user?.email ?? null;
//   }

//   /** Llama a la API si no está cacheado */
//   getUser(): Observable<UserProfile | null> {
//     if (this.user) return of(this.user);

//     return this.http.get<UserProfile>('/api/auth/profile').pipe(
//       tap((user) => (this.user = user)),
//       catchError(() => {
//         this.clearUser();
//         return of(null);
//       })
//     );
//   }

//   /** Permite usarlo de nuevo tras logout o cambio de sesión */
//   clearUser(): void {
//     this.user = null;
//   }
// }
