import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { LoginService } from "../login/login.service";

export const preventLoginGuard: CanActivateFn = () => {
  const loginService = inject(LoginService)
  const router = inject(Router)

  if (!loginService.isAuthenticated()) {
    return true;
  } else {
    return router.navigate(['/dashboard']).then(() => false);
  }
};
