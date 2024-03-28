import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export const AuthGuard = () => {

  const authService = inject(AuthService);
  const router = inject(Router)

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
}
