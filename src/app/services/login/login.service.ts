import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login } from "../../models/login.model";
import { Observable } from "rxjs";
import { Token } from "../../models/token.model";
import { LocalStorageService } from "../storage/local-storage.service";
import { DateUtils } from "../../utils/date.utils";
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends EnvironmentService {

  apiUrlLogin: string = `${this.apiUrl.concat(ApiUrls.login)}`;

  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  isAuthenticated(): boolean {
    const expiration = Number(this.storage.get('token.expiration'));
    const bearer = this.storage.get('token.bearer');
    return !!bearer && !DateUtils.isExpired(expiration);
  }

  login(credentials: Login): Observable<Token> {
    return this.http.post<Token>(this.apiUrlLogin, credentials);
  }

  logout(): void {
    this.storage.clear()
  }

}
