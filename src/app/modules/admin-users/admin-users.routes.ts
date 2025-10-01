import { Routes } from '@angular/router';
import { AdminUsersComponent } from './presentation/admin-users.component';

export const adminUsersRoutes: Routes = [
  {
    path: '',
    component: AdminUsersComponent,
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./presentation/admin-users-form.component').then(
        (m) => m.AdminUsersFormComponent,
      ),
  },
  // TODO: habilitar edición de usuarios cuando se implemente la funcionalidad en el componente [AdminUsersFormComponent]
  // {
  //   path: ':id/editar',
  //   loadComponent: () =>
  //     import('./presentation/admin-users-form.component').then(
  //       (m) => m.AdminUsersFormComponent
  //     ),
  // },
];
