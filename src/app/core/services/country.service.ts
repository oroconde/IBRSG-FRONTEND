import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import {
  Country,
  Department,
  City,
} from '../../modules/admin-users/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl = `${environment.apiUrl}/catalogs`;
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<any[]>(`${this.apiUrl}/countries`).pipe(
      map((res) =>
        res.map((c) => ({
          id: c.countryId,
          name: c.name,
          isoCode: c.isoCode,
        }))
      )
    );
  }

  getDepartments(countryId: number): Observable<Department[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/countries/${countryId}/departments`)
      .pipe(
        map((res) =>
          res.map((d) => ({
            id: d.departmentId,
            name: d.name,
            countryId: d.countryId,
          }))
        )
      );
  }

  getCities(departmentId: number): Observable<City[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/departments/${departmentId}/municipalities`)
      .pipe(
        map((res) =>
          res.map((m) => ({
            id: m.municipalityId,
            name: m.name,
            departmentId: m.departmentId,
          }))
        )
      );
  }
}
