import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { HomeComponent } from './modules/home/home.component';
import { authGuard } from './core/guards/auth.guard';

// Rutas globales
export const routes: Routes = [
  // RUTAS PÚBLICAS
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./modules/auth/pages/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./modules/about/about.component').then(
            (m) => m.AboutComponent,
          ),
      },
      {
        path: 'media',
        loadComponent: () =>
          import('./modules/media/media.component').then(
            (m) => m.MediaComponent,
          ),
      },
      {
        path: 'donations',
        loadComponent: () =>
          import('./modules/donations/donations/donations.component').then(
            (m) => m.DonationsComponent,
          ),
      },
      {
        path: 'articles',
        loadComponent: () =>
          import(
            './modules/articles/presentation/articles-layout.component'
          ).then((m) => m.ArticlesLayoutComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./modules/articles/presentation/articles.component').then(
                (m) => m.ArticlesComponent,
              ),
          },
          {
            path: ':slug',
            loadComponent: () =>
              import(
                './modules/articles/presentation/article-detail.component'
              ).then((m) => m.ArticleDetailComponent),
          },
        ],
      },
    ],
  },

  // RUTAS PRIVADAS (fuera del layout público)
  // ---> Carga las rutas privadas del dashboard
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard-routing.module').then(
        (m) => m.routes,
      ),
  },

  // Redirección opcional para rutas no encontradas
  {
    path: '**',
    redirectTo: '',
  },
];
