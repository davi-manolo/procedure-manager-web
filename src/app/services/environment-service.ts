import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "./storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export abstract class EnvironmentService {

  protected apiUrl: string = environment.apiUrl;

  protected constructor(protected http: HttpClient, protected storage: LocalStorageService) { }

  protected getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');
  }

}
