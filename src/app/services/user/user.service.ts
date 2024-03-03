import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../../models/user.model";
import { Observable } from "rxjs";
import { LocalStorageService } from "../storage/local-storage.service";
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";

@Injectable({
  providedIn: 'root'
})
export class UserService extends EnvironmentService {

  private apiUrlUsers: string = `${this.apiUrl.concat(ApiUrls.user)}`;

  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  getUser(): Observable<User> {
    const params: HttpParams = new HttpParams()
      .set('userMail', `${this.storage.get('user.email')}`);

    return this.http.get<User>(this.apiUrlUsers, { headers: this.defaultHeaders, params: params });
  }

}
