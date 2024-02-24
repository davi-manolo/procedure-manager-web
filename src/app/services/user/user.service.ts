import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../../models/user.model";
import { Observable } from "rxjs";
import { LocalStorageService } from "../storage/local-storage.service";
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";

@Injectable({
  providedIn: 'root'
})
export class UserService extends EnvironmentService {

  apiUrlUsers: string = `${this.apiUrl.concat(ApiUrls.user)}`;

  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  getUser(): Observable<User> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userMail', `${this.storage.get('user.email')}`);

    return this.http.get<User>(this.apiUrlUsers, { headers: headers, params: params });
  }

}
