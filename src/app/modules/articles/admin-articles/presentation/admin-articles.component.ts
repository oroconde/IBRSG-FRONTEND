import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signal } from '@angular/core';
import { ArticlesService } from '../../../articles/articles.service';
import { Article } from '../../interfaces/article.interface';
import { PaginationComponent } from '../../../../shared-components/ui/pagination/pagination.component';

@Component({
  selector: 'app-admin-articles',
  standalone: true,
  templateUrl: './admin-articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, PaginationComponent],
})
export class AdminArticlesComponent {
  private articleService = inject(ArticlesService);

  // Señales reactivas
  readonly page = signal(1);
  readonly totalPages = signal(1);
  readonly articlesList = signal<Article[]>([]);
  readonly limit = 10; // Número de artículos por página

  // Menú Dropdown
  openMenuId = signal<number | null>(null);
  dropdownPosition = signal<Record<string, string>>({});

  constructor() {
    effect(() => {
      this.fetchArticles();
    });
  }

  articles = computed(() => this.articlesList());
  currentPage = computed(() => this.page());
  totalPagesCount = computed(() => this.totalPages());

  onPageChange(page: number) {
    this.page.set(page);
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articleService
      .getAll({
        page: this.currentPage(),
        limit: this.limit,
        order: 'createdAt,DESC',
        relations: 'author',
        select: 'author.firstName,author.lastName',
      })
      .subscribe({
        next: (res) => {
          this.articlesList.set(res.data.docs);
          this.totalPages.set(res.data.totalPages);
        },
        error: (err) => console.error('Error al cargar artículos', err),
      });
  }

  toggleMenu(itemId: number, event: MouseEvent): void {
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const menuWidth = 160; // Ajusta si tu menú es más ancho

    // Cálculo para evitar que el menú se desborde fuera del viewport derecho
    const left =
      rect.left + menuWidth > window.innerWidth
        ? rect.right - menuWidth
        : rect.left;
    this.dropdownPosition.set({
      top: `${rect.bottom + window.scrollY}px`,
      left: `${left}px`, // Ajusta según el ancho del menú
    });
    // Alternar visibilidad del menú contextual
    this.openMenuId.set(this.openMenuId() === itemId ? null : itemId);
  }

  closeMenu() {
    this.openMenuId.set(null);
  }

  verArticulo(id: number): void {
    alert(`Ver artículo con ID: ${id}`);
    this.closeMenu();
  }

  deleteArticle(id: number): void {
    if (confirm('¿Eliminar este artículo?')) {
      console.log('Eliminando:', id);
    }
    this.closeMenu();
  }

  @HostListener('document:scroll')
  onScroll(): void {
    this.closeMenu();
  }

  @ViewChild('menuRef') menuRef!: ElementRef;
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this.menuRef?.nativeElement) return;
    const clickedInside = this.menuRef.nativeElement.contains(
      event.target as Node,
    );
    if (!clickedInside) this.closeMenu();
  }
}
