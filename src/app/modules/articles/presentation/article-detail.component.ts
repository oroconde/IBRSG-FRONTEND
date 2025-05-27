// import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { map, switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { ArticlesService } from '../application/articles.service';
// import { Article } from '../domain/article.model';

// /**
//  * Componente para mostrar los detalles de un artículo.
//  * Este componente utiliza el patrón de diseño Presentación y Contenedor.
//  */
// @Component({
//   selector: 'app-article-detail',
//   standalone: true,
//   imports: [CommonModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   templateUrl: './article-detail.component.html',
// })
// export class ArticleDetailComponent {
//   private route = inject(ActivatedRoute);
//   private articleService = inject(ArticlesService);
//   private sanitizer = inject(DomSanitizer);

//   /** Observable reactivo del artículo */
//   article$: Observable<Article | null> = this.route.paramMap.pipe(
//     map((params) => params.get('slug')),
//     switchMap((slug) =>
//       slug ? this.articleService.getArticleBySlug(slug) : []
//     ),
//     map((res) => res?.data ?? null)
//   );

//   /** Observable con el contenido seguro (sanitizado) */
//   safeContent$: Observable<SafeHtml> = this.article$.pipe(
//     map((article) =>
//       article ? this.sanitizer.bypassSecurityTrustHtml(article.content) : ''
//     )
//   );
// }

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ArticlesService } from '../articles.service';
import { Article } from '../interfaces/article.interface';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  templateUrl: './article-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MarkdownModule],
})
export class ArticleDetailComponent {
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticlesService);

  article$: Observable<Article | null> = this.route.paramMap.pipe(
    map((params) => params.get('slug')),
    switchMap((slug) =>
      slug ? this.articleService.getArticleBySlug(slug) : of(null)
    ),
    map((res) => res?.data ?? null)
  );
}
