import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { LoginService } from "../login/login.service";

export const preventLoginGuard: CanActivateFn = (): boolean | Promise<any> => {
  const loginService: LoginService = inject(LoginService)
  const router: Router = inject(Router)

  if (!loginService.isAuthenticated()) {
    return true;
  } else {
    return router.navigate(['/dashboard']).then((): boolean => false);
  }

};
