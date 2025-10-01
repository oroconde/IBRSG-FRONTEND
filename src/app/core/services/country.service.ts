import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country, Department, City } from '../interfaces/address-interface';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl = `${environment.apiUrl}/catalogs`;
  private http = inject(HttpClient);

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/countries`).pipe(
      map((res) =>
        res.map((c) => ({
          id: c.id,
          name: c.name,
          isoCode: c.isoCode,
        })),
      ),
    );
  }

  getDepartments(id: number): Observable<Department[]> {
    return this.http
      .get<Department[]>(`${this.apiUrl}/countries/${id}/departments`)
      .pipe(
        map((res) =>
          res.map((d) => ({
            id: d.id,
            name: d.name,
            countryId: d.countryId,
          })),
        ),
      );
  }

  getCities(id: number): Observable<City[]> {
    return this.http
      .get<City[]>(`${this.apiUrl}/departments/${id}/municipalities`)
      .pipe(
        map((res) =>
          res.map((m) => ({
            id: m.id,
            name: m.name,
            departmentId: m.departmentId,
          })),
        ),
      );
  }
}
