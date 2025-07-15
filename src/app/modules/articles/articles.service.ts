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
