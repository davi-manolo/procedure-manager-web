import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Procedure } from "../../models/procedure.model";
import { LocalStorageService } from "../storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  getProceduresByPeriod(): Observable<Procedure[]> {
    const url = `${this.apiUrl}/v1/procedures`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token.bearer')}`)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('userId', `${this.storage.get('user.id')}`)
      .set('month', '02') //TODO: Dados devem ser dinâmicos, ajustar após coluna de Ganhos estiver pronto.
      .set('year', '2024'); //TODO: Dados devem ser dinâmicos, ajustar após coluna de Ganhos estiver pronto.

    return this.http.get<Procedure[]>(url, { headers: headers, params: params });
  }

}
