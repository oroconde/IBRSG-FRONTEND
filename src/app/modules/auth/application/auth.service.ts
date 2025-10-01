import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserProfile } from '../interfaces/user-profile.interface';
import { tap } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly API_URL = environment.apiUrl;
  readonly user = signal<UserProfile | null>(null); // 🔐 Signal reactivo para el usuario
  readonly isAuthenticated = computed(() => this.user() !== null); // Computed para saber si hay sesión activa

  /**
   * Inicia sesión con email y password.
   * El backend envía el token en una cookie HttpOnly.
   */
  login(email: string, password: string) {
    return this.http.post(
      `${this.API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }, // para que Angular maneje cookies
    );
  }

  /**
   * Verifica el estado de la sesión y obtiene el perfil del usuario.
   * Se llama al iniciar la app para mantener la sesión activa.
   */
  checkAuthStatus() {
    console.log('[AuthService] checkAuthStatus called');
    return this.http
      .get<{
        data: { access_token?: string; user: UserProfile };
      }>(`${this.API_URL}/auth/check-status`, { withCredentials: true })
      .pipe(
        tap((res) => {
          // 🔑 Guardar el access_token correcto
          if (res.data.access_token) {
            sessionStorage.setItem('access_token', res.data.access_token);
          } else {
            sessionStorage.removeItem('access_token');
          }
          this.user.set(res.data.user);
        }),
      );
  }

  /**
   * Cierra sesión eliminando la cookie desde el backend
   * y limpiando el estado local.
   */
  logout() {
    this.http
      .post(`${this.API_URL}/auth/logout`, {}, { withCredentials: true })
      .subscribe(() => {
        this.user.set(null);
        sessionStorage.removeItem('access_token'); // Limpiar token al cerrar sesión
        this.router.navigate(['/login']);
      });
  }
}
