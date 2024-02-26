import { Injectable } from '@angular/core';
import { EnvironmentService } from "../environment-service";
import { ApiUrls } from "../../../config/api-urls";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LocalStorageService } from "../storage/local-storage.service";
import { Observable } from "rxjs";
import { DatePeriod } from "../../models/date-period.model";

@Injectable({
  providedIn: 'root'
})
export class AccountingService extends EnvironmentService {

  apiUrlAccounting: string = `${this.apiUrl.concat(ApiUrls.accounting)}`;
  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, storage);
  }

  getTotalReceivedAvg(datePeriod: DatePeriod): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<number>(this.apiUrlAccounting.concat('/current/received/average'), { headers: headers, params: params });
  }

  getTotalProceduresPerformedAvg(datePeriod: DatePeriod): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<number>(this.apiUrlAccounting.concat('/current/amount/average'), { headers: headers, params: params });
  }

  getTotalProceduresPerformed(datePeriod: DatePeriod): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<number>(this.apiUrlAccounting.concat('/current/amount'), { headers: headers, params: params });
  }

  getTotalReceived(datePeriod: DatePeriod): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<number>(this.apiUrlAccounting.concat('/current/received'), { headers: headers, params: params });
  }

  getTotalReceivedAvgPrevious(datePeriod: DatePeriod): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<number>(this.apiUrlAccounting.concat('/previous/received/average'), { headers: headers, params: params });
  }

  getTotalProceduresPerformedAvgPrevious(datePeriod: DatePeriod): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<number>(this.apiUrlAccounting.concat('/previous/amount/average'), { headers: headers, params: params });
  }

  getTotalProceduresPerformedPrevious(datePeriod: DatePeriod): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<number>(this.apiUrlAccounting.concat('/previous/amount'), { headers: headers, params: params });
  }

  getTotalReceivedPrevious(datePeriod: DatePeriod): Observable<number> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', datePeriod.month)
      .set('year', datePeriod.year);

    return this.http.get<number>(this.apiUrlAccounting.concat('/previous/received'), { headers: headers, params: params });
  }

}
