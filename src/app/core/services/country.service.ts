import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Country, Department, City } from '../interfaces/address-interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl = `${environment.apiUrl}/catalogs`;
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<any[]>(`${this.apiUrl}/countries`).pipe(
      map((res) =>
        res.map((c) => ({
          id: c.id,
          name: c.name,
          isoCode: c.isoCode,
        }))
      )
    );
  }

  getDepartments(id: number): Observable<Department[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/countries/${id}/departments`)
      .pipe(
        map((res) =>
          res.map((d) => ({
            id: d.id,
            name: d.name,
            countryId: d.countryId,
          }))
        )
      );
  }

  getCities(id: number): Observable<City[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/departments/${id}/municipalities`)
      .pipe(
        map((res) =>
          res.map((m) => ({
            id: m.id,
            name: m.name,
            departmentId: m.departmentId,
          }))
        )
      );
  }
}
