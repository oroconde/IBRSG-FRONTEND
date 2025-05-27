import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const UserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // TODO adaptar esta lógica para usar tu servicio de auth en lugar de localStorage.
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user?.role === 'user') {
    return true;
  }

  return router.createUrlTree(['/login']);
};
