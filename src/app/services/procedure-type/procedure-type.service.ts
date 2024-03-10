import { Injectable } from '@angular/core';
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";
import { HttpClient, HttpParams } from "@angular/common/http";
import { LocalStorageService } from "../storage/local-storage.service";
import { Observable } from "rxjs";
import { ProcedureType } from "../../models/procedure-type.model";
import { DataProcedureTypeRequest } from "../../models/data-procedure-type-request.model";

@Injectable({
  providedIn: 'root'
})
export class ProcedureTypeService extends EnvironmentService {

  private apiUrlProcedureType: string = `${this.apiUrl.concat(ApiUrls.procedureType)}`;

  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  getProceduresTypes(): Observable<ProcedureType[]> {
    const params: HttpParams = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`);

    return this.http.get<ProcedureType[]>(
      this.apiUrlProcedureType,
      { headers: this.getDefaultHeaders(), params: params }
    );
  }

  deleteProcedure(procedureTypeId: string): Observable<void> {
    const url: string = this.apiUrlProcedureType.concat(`/${procedureTypeId}/disable`)

    const params: HttpParams = new HttpParams().set('userId', `${this.storage.get('user.id')}`);

    return this.http.patch<void>(url, null, { headers: this.getDefaultHeaders(), params: params });
  }

  addProcedureType(dataProcedureTypeRequest: DataProcedureTypeRequest): Observable<void> {
    dataProcedureTypeRequest.userId = this.storage.get('user.id');

    return this.http.post<void>(
      this.apiUrlProcedureType,
      dataProcedureTypeRequest,
      { headers: this.getDefaultHeaders() }
    );
  }

  updateProcedureType(procedureTypeId: string, dataProcedureTypeRequest: DataProcedureTypeRequest): Observable<void> {
    const url: string = this.apiUrlProcedureType.concat(`/${procedureTypeId}/update`)

    dataProcedureTypeRequest.userId = this.storage.get('user.id');

    return this.http.patch<void>(url, dataProcedureTypeRequest, { headers: this.getDefaultHeaders() });
  }

}
