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
import { IPersonWithUser } from '../interfaces/article.interface';
import { UsersService } from '../users.service';

// @Component({
//   selector: 'app-admin-users',
//   standalone: true,
//   templateUrl: './admin-users.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   imports: [RouterModule, CommonModule, PaginationComponent],
// })
// export class AdminUsersComponent {
//   private readonly usersService = inject(UsersService);

//   // Señales reactivas
//   readonly searchName = signal('');
//   readonly page = signal(1);
//   readonly totalPages = signal(1);
//   readonly usersList = signal<IPersonWithUser[]>([]);
//   readonly limit = 10; // Número de artículos por página

//   // Menú Dropdown
//   openMenuId = signal<number | null>(null);
//   dropdownPosition = signal<Record<string, string>>({});

//   constructor() {
//     effect(() => {
//       this.fetchUsers();
//     });
//   }

//   users = computed(() => this.usersList());
//   currentPage = computed(() => this.page());
//   totalPagesCount = computed(() => this.totalPages());

//   onPageChange(page: number) {
//     this.page.set(page);
//     this.fetchUsers();
//   }

//   public fetchUsers(): void {
//     this.usersService
//       .getAllUsers({
//         page: this.page(),
//         limit: this.limit,
//         order: 'firstName,ASC',
//         relations: 'user',
//         select: 'user.roles',
//         fullName: this.searchName()?.trim() || undefined,
//       })
//       .subscribe({
//         next: (res) => {
//           this.usersList.set(res.data.docs);
//           this.totalPages.set(res.data.totalPages);
//         },
//         error: (err) => {
//           console.error('[Error al cargar usuarios]', err);
//         },
//       });
//   }

//   toggleMenu(itemId: number, event: MouseEvent): void {
//     event.stopPropagation();
//     const target = event.currentTarget as HTMLElement;
//     const rect = target.getBoundingClientRect();
//     const menuWidth = 160; // Ajusta si tu menú es más ancho

//     // Cálculo para evitar que el menú se desborde fuera del viewport derecho
//     rect.left + menuWidth > window.innerWidth
//       ? rect.right - menuWidth
//       : rect.left;
//     this.dropdownPosition.set({
//       top: `${rect.bottom + window.scrollY}px`,
//       left: `${rect.right - 140}px`, // Ajusta según el ancho del menú
//     });
//     // Alternar visibilidad del menú contextual
//     this.openMenuId.set(this.openMenuId() === itemId ? null : itemId);
//   }

//   closeMenu() {
//     this.openMenuId.set(null);
//   }

//   public viewUser(userId: number): void {
//     alert(`Ver usuario con ID: ${userId}`);
//     this.closeMenu();
//   }

//   deleteUser(userId: number) {
//     if (!confirm('¿Deseas eliminar este usuario?')) return;

//     this.usersService.deleteUser(userId).subscribe({
//       next: () => {
//         console.log('[Usuario eliminado]');
//         this.fetchUsers();
//       },
//       error: (err) => console.error('[Error al eliminar usuario]', err),
//     });
//   }

//   @HostListener('document:scroll')
//   onScroll(): void {
//     this.closeMenu();
//   }

//   @ViewChild('menuRef') menuRef!: ElementRef;
//   @HostListener('document:click', ['$event'])
//   handleClickOutside(event: MouseEvent): void {
//     if (!this.menuRef?.nativeElement) return;
//     const clickedInside = this.menuRef.nativeElement.contains(
//       event.target as Node
//     );
//     if (!clickedInside) this.closeMenu();
//   }
// }

//VERSION debounce
// @Component({
//   selector: 'app-admin-users',
//   standalone: true,
//   templateUrl: './admin-users.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   imports: [RouterModule, CommonModule, PaginationComponent],
// })
// export class AdminUsersComponent {
//   private readonly usersService = inject(UsersService);

//   // Señales reactivas
//   readonly page = signal(1);
//   readonly totalPages = signal(1);
//   readonly usersList = signal<IPersonWithUser[]>([]);
//   readonly limit = 10;

//   readonly searchControl = signal('');
//   private debounceTimer: any;

//   openMenuId = signal<number | null>(null);
//   dropdownPosition = signal<Record<string, string>>({});

//   constructor() {
//     effect(() => {
//       this.fetchUsers();
//     });
//   }

//   users = computed(() => this.usersList());
//   currentPage = computed(() => this.page());
//   totalPagesCount = computed(() => this.totalPages());

//   onPageChange(page: number) {
//     this.page.set(page);
//     this.fetchUsers();
//   }

//   onSearchInput(value: string): void {
//     const trimmedValue = value.trim();

//     // Si el valor ya es el mismo, no hagas nada
//     if (this.searchControl().trim() === trimmedValue) return;

//     // Actualiza el signal solo si cambia el valor
//     this.searchControl.set(trimmedValue);

//     clearTimeout(this.debounceTimer);

//     // Aplica debounce profesional
//     this.debounceTimer = setTimeout(() => {
//       // Si está vacío y ya se muestran todos, no hace falta recargar
//       if (!trimmedValue && this.page() === 1 && this.usersList().length > 0)
//         return;

//       this.page.set(1);
//       this.fetchUsers();
//     }, 800);
//   }

//   public fetchUsers(): void {
//     const fullNameValue = this.searchControl().trim();
//     const params: Record<string, any> = {
//       page: this.page(),
//       limit: this.limit,
//       order: 'firstName,ASC',
//       relations: 'user',
//       select: 'user.roles',
//     };

//     if (fullNameValue.length > 0) {
//       params['fullName'] = fullNameValue;
//     }

//     this.usersService.getAllUsers(params).subscribe({
//       next: (res) => {
//         this.usersList.set(res.data.docs);
//         this.totalPages.set(res.data.totalPages);
//       },
//       error: (err) => {
//         console.error('[Error al cargar usuarios]', err);
//       },
//     });
//   }

//   toggleMenu(itemId: number, event: MouseEvent): void {
//     event.stopPropagation();
//     const target = event.currentTarget as HTMLElement;
//     const rect = target.getBoundingClientRect();
//     const menuWidth = 160;

//     rect.left + menuWidth > window.innerWidth
//       ? rect.right - menuWidth
//       : rect.left;

//     this.dropdownPosition.set({
//       top: `${rect.bottom + window.scrollY}px`,
//       left: `${rect.right - 140}px`,
//     });

//     this.openMenuId.set(this.openMenuId() === itemId ? null : itemId);
//   }

//   closeMenu() {
//     this.openMenuId.set(null);
//   }

//   public viewUser(userId: number): void {
//     alert(`Ver usuario con ID: ${userId}`);
//     this.closeMenu();
//   }

//   deleteUser(userId: number) {
//     if (!confirm('¿Deseas eliminar este usuario?')) return;

//     this.usersService.deleteUser(userId).subscribe({
//       next: () => {
//         console.log('[Usuario eliminado]');
//         this.fetchUsers();
//       },
//       error: (err) => console.error('[Error al eliminar usuario]', err),
//     });
//   }

//   @HostListener('document:scroll')
//   onScroll(): void {
//     this.closeMenu();
//   }

//   @ViewChild('menuRef') menuRef!: ElementRef;
//   @HostListener('document:click', ['$event'])
//   handleClickOutside(event: MouseEvent): void {
//     if (!this.menuRef?.nativeElement) return;
//     const clickedInside = this.menuRef.nativeElement.contains(
//       event.target as Node
//     );
//     if (!clickedInside) this.closeMenu();
//   }
// }

@Component({
  selector: 'app-admin-users',
  standalone: true,
  templateUrl: './admin-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule, PaginationComponent],
})
export class AdminUsersComponent {
  private readonly usersService = inject(UsersService);

  readonly page = signal(1);
  readonly totalPages = signal(1);
  readonly usersList = signal<IPersonWithUser[]>([]);
  readonly limit = 10;
  readonly searchControl = signal('');

  openMenuId = signal<number | null>(null);
  dropdownPosition = signal<Record<string, string>>({});

  constructor() {
    this.fetchUsers(); // carga inicial
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
      order: 'firstName,ASC',
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
