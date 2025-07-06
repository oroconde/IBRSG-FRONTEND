// src/app/modules/core/services/country.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Array<{ id: string; name: string }>> {
    return this.http
      .get<any>('https://countriesnow.space/api/v0.1/countries/positions')
      .pipe(
        map((resp) => {
          if (!resp || !resp.data) return [];
          return resp.data.map((item: any) => ({
            id: item.name,
            name: item.name,
          }));
        }),
      );
  }

  getDepartments(country: string): Observable<any[]> {
    return this.http
      .post<any>('https://countriesnow.space/api/v0.1/countries/states', {
        country,
      })
      .pipe(
        map((resp) => {
          if (!resp || !resp.data || !resp.data.states) return [];
          return resp.data.states.map((s: any) => ({
            id: s.name,
            nombre: s.name,
            countryId: country,
          }));
        }),
      );
  }

  getCities(country: string, state: string): Observable<any[]> {
    return this.http
      .post<any>('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country,
        state,
      })
      .pipe(
        map((resp) => {
          if (!resp || !resp.data) return [];
          return resp.data.map((c: string) => ({
            id: c,
            nombre: c,
            departmentsId: state,
          }));
        }),
      );
  }
}
