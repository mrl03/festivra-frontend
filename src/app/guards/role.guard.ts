import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data?.['expectedRole']; // 'ROLE_ADMIN' o 'ROLE_AGENT'
  const user = auth.decodeToken();

  if (auth.isAuthenticated() && user?.roles?.includes(expectedRole)) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
