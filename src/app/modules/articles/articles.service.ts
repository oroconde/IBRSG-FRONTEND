import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Article } from './interfaces/article.interface';
import { BaseApiService } from '../../core/services/base-api.service';
import { environment } from '@env/environment';
import { HttpParamsType } from 'src/app/core/types/http-params.type';

@Injectable({ providedIn: 'root' })
export class ArticlesService extends BaseApiService<Article> {
  protected override baseUrl = `${environment.apiUrl}/articles`;

  protected override http = inject(HttpClient);
  constructor() {
    super(inject(HttpClient));
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

  getAll(params?: HttpParamsType) {
    return this.findAll({ params });
  }

  getById(id: string) {
    return this.findOne(id);
  }
}
