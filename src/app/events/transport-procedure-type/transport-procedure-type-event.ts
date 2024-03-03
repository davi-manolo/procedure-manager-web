import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ProcedureType } from "../../models/procedure-type.model";

@Injectable({
  providedIn: 'root'
})
export class TransportProcedureTypeEvent {

  private selectedProcedureTypeSubject = new BehaviorSubject<ProcedureType>(new ProcedureType());

  setSelectedProcedureType(item: ProcedureType) {
    this.selectedProcedureTypeSubject.next(item);
  }

  getSelectedProcedureType(): Observable<ProcedureType> {
    return this.selectedProcedureTypeSubject.asObservable();
  }

}
