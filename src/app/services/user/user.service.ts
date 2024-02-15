import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../../models/user.model";
import { Observable } from "rxjs";
import { LocalStorageService } from "../storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  getUser(): Observable<User> {
    const url = `${this.apiUrl}/v1/users`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userMail', `${this.storage.get('user.email')}`);

    return this.http.get<User>(url, { headers: headers, params: params });
  }

}
