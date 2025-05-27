import { Routes } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin.guard';
import { UserGuard } from '../../core/guards/user.guard';
import { PrivateLayoutComponent } from '../../layout/private-layout/private-layout.component';

// Rutas privadas internas del dashboard
export const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent, // Layout privado para rutas internas
    children: [
      {
        path: 'admin',
        loadComponent: () =>
          import('./presentation/admin/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
        // canActivate: [AdminGuard],
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./presentation/user/user-dashboard.component').then(
            (m) => m.UserDashboardComponent
          ),
        // canActivate: [UserGuard],
      },
      {
        path: 'admin/articulos',
        loadChildren: () =>
          import(
            '../../modules/articles/admin-articles/admin-articles.routes'
          ).then((m) => m.adminArticlesRoutes),
        // canActivate: [AdminGuard],
      },
      {
        path: 'admin/directorio',
        loadChildren: () =>
          import('../../modules/admin-users/admin-users.routes').then(
            (m) => m.adminUsersRoutes
          ),
        // canActivate: [AdminGuard],
      },
    ],
  },
];
