import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { LoginService } from "../login/login.service";


export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService)

  if (loginService.isAuthenticated()) {
    return true;
  } else {
    loginService.logout();
    return false;
  }

};
