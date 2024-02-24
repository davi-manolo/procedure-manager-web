import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "./storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export abstract class EnvironmentService {

  protected apiUrl = environment.apiUrl;

  protected constructor(protected http: HttpClient, protected storage: LocalStorageService) { }

}
