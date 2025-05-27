import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { PaginationComponent } from '../../../shared-components/ui/pagination/pagination.component';
import { Article } from '../interfaces/article.interface';
import { MarkdownPipe } from '../../../core/pipes/markdown.pipe';

@Component({
  selector: 'app-articles',
  standalone: true,
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    PaginationComponent,
    //  MarkdownPipe
  ],
})
export class ArticlesComponent implements OnInit {
  private articleService = inject(ArticlesService);
  private readonly limit = 3; // Número de artículos por página
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
  readonly articles = signal<Article[]>([]);

  ngOnInit(): void {
    this.fetchArticles();
  }

  // Computed properties para la navegación
  fetchArticles(): void {
    this.articleService
      .getAll({
        page: this.currentPage(),
        limit: this.limit,
        order: 'createdAt,DESC',
        // relations: 'user.people',
        // select: 'user.userId,user.people.firstName,user.people.lastName',
        relations: 'author',
        select: 'author.firstName,author.lastName',
      })
      .subscribe({
        next: (res) => {
          this.articles.set(res.data.docs);
          this.totalPages.set(res.data.totalPages);
        },
        error: (err) => console.error('Error al cargar artículos', err),
      });
  }

  // Método para manejar el cambio de página
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.fetchArticles();
  }
}
