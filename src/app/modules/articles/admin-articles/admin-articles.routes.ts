import { Routes } from '@angular/router';
import { AdminArticlesComponent } from './presentation/admin-articles.component';

export const adminArticlesRoutes: Routes = [
  {
    path: '',
    component: AdminArticlesComponent,
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./presentation/admin-articles-form.component').then(
        (m) => m.AdminArticlesFormComponent
      ),
  },
  {
    path: ':id/editar',
    loadComponent: () =>
      import('./presentation/admin-articles-form.component').then(
        (m) => m.AdminArticlesFormComponent
      ),
  },
];
