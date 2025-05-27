// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../enviroments/environment';
// import { Article } from './interfaces/article.interface';

// @Injectable({ providedIn: 'root' })
// export class ArticlesService {
//   private API_URL = `${environment.apiUrl}/articles`;

//   constructor(private http: HttpClient) {}

//   getAll(params?: Record<string, any>) {
//     let httpParams = new HttpParams();
//     Object.entries(params || {}).forEach(([key, value]) => {
//       if (value !== null && value !== undefined) {
//         httpParams = httpParams.set(key, value);
//       }
//     });

//     return this.http.get<{ data: { docs: Article[]; totalPages: number } }>(
//       this.API_URL,
//       { params: httpParams }
//     );
//   }

//   getArticleBySlug(slug: string) {
//     return this.http.get<{ data: Article }>(`${this.API_URL}/${slug}`);
//   }

//   createArticle(payload: { title: string; content: string }): Observable<any> {
//     return this.http.post(`${this.API_URL}`, payload);
//   }

//   update(id: string, payload: Partial<Article>) {
//     return this.http.patch<{ data: Article }>(`${this.API_URL}/${id}`, payload);
//   }

//   getById(id: string) {
//     return this.http.get<{ data: Article }>(`${this.API_URL}/${id}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/environment';
import { Article } from './interfaces/article.interface';
import { BaseApiService } from '../../core/services/base-api.service';

@Injectable({ providedIn: 'root' })
export class ArticlesService extends BaseApiService<Article> {
  protected override baseUrl = `${environment.apiUrl}/articles`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  createArticle(payload: { title: string; content: string }) {
    return this.create(payload);
  }

  /**
   * Método personalizado para obtener artículo por slug
   */
  getArticleBySlug(slug: string) {
    return this.http.get<{ data: Article }>(`${this.baseUrl}/${slug}`);
  }

  getAll(params?: Record<string, any>) {
    return this.findAll({ params });
  }

  getById(id: string) {
    return this.findOne(id);
  }
}
