import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
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

  private apiUrlProcedure: string = `${this.apiUrl.concat(ApiUrls.procedure)}`;

  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  addProcedure(dataProcedureRequest: DataProcedureRequest): Observable<void> {
    dataProcedureRequest.userId = this.storage.get('user.id');

    return this.http.post<void>(
      this.apiUrlProcedure,
      dataProcedureRequest,
      { headers: this.getDefaultHeaders() }
    );
  }

  getProceduresByPeriod(datePeriod: DatePeriod): Observable<Procedure[]> {
    const params:HttpParams = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<Procedure[]>(
      this.apiUrlProcedure,
      { headers: this.getDefaultHeaders(), params: params }
    );
  }

  updateProcedure(procedureId: string, dataProcedureRequest: DataProcedureRequest): Observable<void> {
    const url: string = this.apiUrlProcedure.concat(`/${procedureId}/update`)

    dataProcedureRequest.userId = this.storage.get('user.id');

    return this.http.patch<void>(url, dataProcedureRequest, { headers: this.getDefaultHeaders() });
  }

  deleteProcedure(procedureId: string): Observable<void> {
    const url: string = this.apiUrlProcedure.concat(`/${procedureId}/disable`)

    const params: HttpParams = new HttpParams().set('userId', `${this.storage.get('user.id')}`);

    return this.http.patch<void>(url, null, { headers: this.getDefaultHeaders(), params: params });
  }

}
