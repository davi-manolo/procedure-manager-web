import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Login } from "../../models/login.model";
import { Observable } from "rxjs";
import { Token } from "../../models/token.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<Token> {
    const url = `${this.apiUrl}/v1/login`;
    return this.http.post<Token>(url, credentials);

  }

}
