import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../shared-components/ui/pagination/pagination.component';
import { UsersService } from '../users.service';
import { AuthService } from '../../auth/application/auth.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  templateUrl: './admin-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule, PaginationComponent],
})
export class AdminUsersComponent {
  private readonly usersService = inject(UsersService);
  private readonly authService = inject(AuthService);

  readonly page = signal(1);
  readonly totalPages = signal(1);
  readonly usersList = signal<any[]>([]);
  readonly limit = 10;
  readonly searchControl = signal('');

  openMenuId = signal<number | null>(null);
  dropdownPosition = signal<Record<string, string>>({});

  constructor() {
    // Espera a que AuthService.user() tenga valor antes de llamar fetchUsers()
    effect(() => {
      const user = this.authService.user();
      if (user) {
        this.fetchUsers();
      }
    });
  }

  users = computed(() => this.usersList());
  currentPage = computed(() => this.page());
  totalPagesCount = computed(() => this.totalPages());

  onPageChange(page: number) {
    this.page.set(page);
    this.fetchUsers();
  }

  onSearchSubmit(): void {
    this.page.set(1);
    this.fetchUsers();
  }

  public fetchUsers(): void {
    const fullNameValue = this.searchControl().trim();
    const params: Record<string, any> = {
      page: this.page(),
      limit: this.limit,
      order: 'createdAt,DESC',
      relations: 'user',
      select: 'user.roles',
    };

    if (fullNameValue.length > 0) {
      params['fullName'] = fullNameValue;
    }

    this.usersService.getAllUsers(params).subscribe({
      next: (res) => {
        this.usersList.set(res.data.docs);
        this.totalPages.set(res.data.totalPages);
      },
      error: (err) => {
        console.error('[Error al cargar usuarios]', err);
      },
    });
  }

  toggleMenu(itemId: number, event: MouseEvent): void {
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    this.dropdownPosition.set({
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.right - 140}px`,
    });

    this.openMenuId.set(this.openMenuId() === itemId ? null : itemId);
  }

  closeMenu() {
    this.openMenuId.set(null);
  }

  viewUser(userId: number): void {
    alert(`Ver usuario con ID: ${userId}`);
    this.closeMenu();
  }

  deleteUser(userId: number) {
    if (!confirm('¿Deseas eliminar este usuario?')) return;

    this.usersService.deleteUser(userId).subscribe({
      next: () => {
        this.fetchUsers();
      },
      error: (err) => console.error('[Error al eliminar usuario]', err),
    });
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
      event.target as Node
    );
    if (!clickedInside) this.closeMenu();
  }
}
