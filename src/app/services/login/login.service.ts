import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login } from "../../models/login.model";
import { Observable } from "rxjs";
import { Token } from "../../models/token.model";
import { LocalStorageService } from "../storage/local-storage.service";
import { DateUtils } from "../../utils/date.utils";
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends EnvironmentService {

  private apiUrlLogin: string = `${this.apiUrl.concat(ApiUrls.login)}`;

  constructor(http: HttpClient, storage: LocalStorageService, private router: Router) {
    super(http, storage);
  }

  isAuthenticated(): boolean {
    const expiration: number = Number(this.storage.get('token.expiration'));
    const bearer: string = this.storage.get('token.bearer');
    return !!bearer && !DateUtils.isExpired(expiration);
  }

  login(credentials: Login): Observable<Token> {
    return this.http.post<Token>(this.apiUrlLogin, credentials);
  }

  logout(): void {
    this.clearSessionData();
    this.redirectToLogin();
  }

  clearSessionData(): void {
    this.storage.clear()
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']).then((): boolean => false)
  }

  isTokenExpiredThenRedirect(): boolean {
    if (!this.isAuthenticated()) {
      this.logout()
      return false;
    } else {
      return true;
    }
  }

}
