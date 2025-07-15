import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../core/services/base-api.service';
import { environment } from '../../../enviroments/environment';
import {
  City,
  Country,
  Department,
  IPersonWithUser,
} from './interfaces/user.interface';
import { map, Observable } from 'rxjs';
import { IPaginatedResponse } from '../../core/interfaces/paginated.response.interface';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseApiService<IPersonWithUser> {
  protected override baseUrl = `${environment.apiUrl}/person`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAllUsers(
    params?: Record<string, any> // : Observable<IPaginatedResponse<IPersonWithUser>>
  ) {
    return this.findAll({ params });
  }

  getCountries(): Observable<Country[]> {
    return this.http
      .get<{ data: { docs: Country[] } }>('/api/v2/catalogs/countries')
      .pipe(map((response) => response.data.docs));
  }

  createUser(payload: Partial<IPersonWithUser>): Observable<IPersonWithUser> {
    return this.create(payload);
  }

  /**
   * ✅ Actualizar usuario
   */
  updateUser(
    id: number | string,
    payload: Partial<IPersonWithUser>
  ): Observable<IPersonWithUser> {
    return this.update(id, payload);
  }

  /**
   * 📌 Obtener usuario por email
   */
  findByEmail(email: string): Observable<{ data: IPersonWithUser }> {
    return this.http.get<{ data: IPersonWithUser }>(
      `${this.baseUrl}/by-email/${email}`
    );
  }

  /**
   * 📌 Cambiar estado de usuario (activar/desactivar)
   */
  toggleUserStatus(userId: number, isActive: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${userId}/status`, {
      isActive,
    });
  }

  /**
   * 📌 Asignar roles al usuario
   */
  assignRoles(userId: number, roles: string[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/roles`, { roles });
  }

  /**
   * 📌 Eliminar usuario
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
