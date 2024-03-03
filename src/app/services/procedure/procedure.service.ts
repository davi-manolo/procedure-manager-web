import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Procedure } from "../../models/procedure.model";
import { LocalStorageService } from "../storage/local-storage.service";
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";
import { DatePeriod } from "../../models/date-period.model";
import { DataProcedureRequest } from "../../models/data-procedure-request.model";

@Injectable({
  providedIn: 'root'
})
export class ProcedureService extends EnvironmentService {

  apiUrlProcedure: string = `${this.apiUrl.concat(ApiUrls.procedure)}`;

  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  addProcedure(dataProcedureRequest: DataProcedureRequest): Observable<void> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    dataProcedureRequest.userId = this.storage.get('user.id');

    return this.http.post<void>(this.apiUrlProcedure, dataProcedureRequest, { headers: headers });
  }

  getProceduresByPeriod(datePeriod: DatePeriod): Observable<Procedure[]> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<Procedure[]>(this.apiUrlProcedure, { headers: headers, params: params });
  }

  updateProcedure(procedureId: string, dataProcedureRequest: DataProcedureRequest): Observable<void> {
    const url = this.apiUrlProcedure.concat(`/${procedureId}/update`)

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    dataProcedureRequest.userId = this.storage.get('user.id');

    return this.http.patch<void>(url, dataProcedureRequest, { headers: headers });
  }

  deleteProcedure(procedureId: string): Observable<void> {
    const url = this.apiUrlProcedure.concat(`/${procedureId}/disable`)

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams().set('userId', `${this.storage.get('user.id')}`);

    return this.http.patch<void>(url, null, { headers: headers, params: params });
  }

}
