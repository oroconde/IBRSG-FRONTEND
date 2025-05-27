import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/application/auth.service';

export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user();
  if (user?.roles?.includes('ADMIN')) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
