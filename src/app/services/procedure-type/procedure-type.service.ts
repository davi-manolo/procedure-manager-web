import { Injectable } from '@angular/core';
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LocalStorageService } from "../storage/local-storage.service";
import { Observable } from "rxjs";
import { ProcedureType } from "../../models/procedure-type.model";

@Injectable({
  providedIn: 'root'
})
export class ProcedureTypeService extends EnvironmentService {

  apiUrlProcedureType: string = `${this.apiUrl.concat(ApiUrls.procedureType)}`;

  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  getProceduresTypes(): Observable<ProcedureType[]> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`);

    return this.http.get<ProcedureType[]>(this.apiUrlProcedureType, { headers: headers, params: params });
  }

}
