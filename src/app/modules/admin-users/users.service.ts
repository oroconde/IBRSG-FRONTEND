import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BaseApiService } from '../../core/services/base-api.service';
import { IPersonWithUser } from './interfaces/user.interface';
import { Observable } from 'rxjs';
import { IPaginatedResponse } from '../../core/interfaces/paginated.response.interface';
import { HttpParamsType } from '../../core/types/http-params.type';
import { ICreateUserDto } from './interfaces/create-user.interface';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseApiService<IPersonWithUser> {
  protected override baseUrl = `${environment.apiUrl}/person`;

  protected override http = inject(HttpClient);
  constructor() {
    super(inject(HttpClient));
  }

  /**
   * Obtener todos los usuarios con soporte para paginación y filtros
   */
  getAllUsers(
    params?: HttpParamsType,
  ): Observable<IPaginatedResponse<IPersonWithUser>> {
    return this.findAll({ params });
  }

  // createUser(payload: Partial<IPersonWithUser>): Observable<IPersonWithUser> {
  //   return this.create(payload);
  // }

  createUser(payload: Partial<ICreateUserDto>): Observable<ICreateUserDto> {
    return this.http.post<ICreateUserDto>(
      `${environment.apiUrl}/user`,
      payload,
    );
  }

  /**
   * Actualizar usuario
   */
  updateUser(
    id: number | string,
    payload: Partial<IPersonWithUser>,
  ): Observable<IPersonWithUser> {
    return this.update(id, payload);
  }

  /**
   * Obtener usuario por email
   */
  findByEmail(email: string): Observable<{ data: IPersonWithUser }> {
    return this.http.get<{ data: IPersonWithUser }>(
      `${this.baseUrl}/by-email/${email}`,
    );
  }

  /**
   * Cambiar estado de usuario (activar/desactivar)
   */
  toggleUserStatus(userId: number, isActive: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${userId}/status`, {
      isActive,
    });
  }

  /**
   * Asignar roles al usuario
   */
  assignRoles(userId: number, roles: string[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/roles`, { roles });
  }

  /**
   * Eliminar usuario
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
