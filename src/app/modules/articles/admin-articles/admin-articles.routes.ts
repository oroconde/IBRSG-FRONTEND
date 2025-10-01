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
        (m) => m.AdminArticlesFormComponent,
      ),
  },
  // TODO: habilitar edición de ARTICULOS cuando se implemente la funcionalidad en el componente [AdminArticlesFormComponent]
  // {
  //   path: ':id/editar',
  //   loadComponent: () =>
  //     import('./presentation/admin-articles-form.component').then(
  //       (m) => m.AdminArticlesFormComponent,
  //     ),
  // },
];
