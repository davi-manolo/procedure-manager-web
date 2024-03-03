import { Injectable } from '@angular/core';
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";
import { HttpClient, HttpParams } from "@angular/common/http";
import { LocalStorageService } from "../storage/local-storage.service";
import { Observable } from "rxjs";
import { DatePeriod } from "../../models/date-period.model";

@Injectable({
  providedIn: 'root'
})
export class AccountingService extends EnvironmentService {

  private apiUrlAccounting: string = `${this.apiUrl.concat(ApiUrls.accounting)}`;

  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  getTotalReceivedAvg(datePeriod: DatePeriod): Observable<number> {
    return this.makeHttpRequest('current/received/average', datePeriod);
  }

  getTotalProceduresPerformedAvg(datePeriod: DatePeriod): Observable<number> {
    return this.makeHttpRequest('current/amount/average', datePeriod);
  }

  getTotalProceduresPerformed(datePeriod: DatePeriod): Observable<number> {
    return this.makeHttpRequest('current/amount', datePeriod);
  }

  getTotalReceived(datePeriod: DatePeriod): Observable<number> {
    return this.makeHttpRequest('current/received', datePeriod);
  }

  getTotalReceivedAvgPrevious(datePeriod: DatePeriod): Observable<number> {
    return this.makeHttpRequest('previous/received/average', datePeriod);
  }

  getTotalProceduresPerformedAvgPrevious(datePeriod: DatePeriod): Observable<number> {
    return this.makeHttpRequest('previous/amount/average', datePeriod);
  }

  getTotalProceduresPerformedPrevious(datePeriod: DatePeriod): Observable<number> {
    return this.makeHttpRequest('previous/amount', datePeriod);
  }

  getTotalReceivedPrevious(datePeriod: DatePeriod): Observable<number> {
    return this.makeHttpRequest('previous/received', datePeriod);
  }

  private buildParams(datePeriod: DatePeriod): HttpParams {
    return new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);
  }

  private makeHttpRequest(endpoint: string, datePeriod: DatePeriod): Observable<number> {
    const params: HttpParams = this.buildParams(datePeriod);

    return this.http.get<number>(
      `${this.apiUrlAccounting}/${endpoint}`,
      { headers: this.getDefaultHeaders(), params: params }
    );
  }

}
