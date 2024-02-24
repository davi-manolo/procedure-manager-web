import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Procedure } from "../../models/procedure.model";
import { LocalStorageService } from "../storage/local-storage.service";
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";

@Injectable({
  providedIn: 'root'
})
export class ProcedureService extends EnvironmentService {

  apiUrlProcedure: string = `${this.apiUrl.concat(ApiUrls.procedure)}`;

  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  getProceduresByPeriod(): Observable<Procedure[]> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', '02') //TODO: Dados devem ser dinâmicos, ajustar após coluna de Ganhos estiver pronto.
      .set('year', '2024'); //TODO: Dados devem ser dinâmicos, ajustar após coluna de Ganhos estiver pronto.

    return this.http.get<Procedure[]>(this.apiUrlProcedure, { headers: headers, params: params });
  }

}
