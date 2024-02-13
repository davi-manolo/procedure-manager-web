import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Login } from "../../models/login.model";
import { Observable } from "rxjs";
import { Token } from "../../models/token.model";
import { LocalStorageService } from "../storage/local-storage.service";
import { DateUtils } from "../../utils/date.utils";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  isAuthenticated(): boolean {
    const expiration = Number(this.localStorage.get('token.expiration'));
    const bearer = this.localStorage.get('token.bearer');
    return !!bearer && !DateUtils.isExpired(expiration);
  }

  login(credentials: Login): Observable<Token> {
    const url = `${this.apiUrl}/v1/login`;
    return this.http.post<Token>(url, credentials);
  }

  logout(): void {
    localStorage.clear()
  }

}
