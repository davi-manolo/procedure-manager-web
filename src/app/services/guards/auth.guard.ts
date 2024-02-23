import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { LoginService } from "../login/login.service";


export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService)
  const router = inject(Router)

  if (loginService.isAuthenticated()) {
    return true;
  } else {
    loginService.logout();
    router.navigate(['/login']).then(() => false);
    return false;
  }
};
