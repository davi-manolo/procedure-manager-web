import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Procedure } from "../../models/procedure.model";

@Injectable({
  providedIn: 'root'
})
export class TransportProcedureEvent {

  private selectedProcedureSubject = new BehaviorSubject<Procedure>(new Procedure());
  selectedProcedure = this.selectedProcedureSubject.asObservable();

  setSelectedProcedure(item: Procedure) {
    this.selectedProcedureSubject.next(item);
  }

}
