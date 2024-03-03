import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { Procedure } from "../../models/procedure.model";

@Injectable({
  providedIn: 'root'
})
export class TransportProcedureEvent {

  private selectedProcedureSubject: BehaviorSubject<Procedure> = new BehaviorSubject<Procedure>(new Procedure());
  selectedProcedure: Observable<any> = this.selectedProcedureSubject.asObservable();

  setSelectedProcedure(item: Procedure): void {
    this.selectedProcedureSubject.next(item);
  }

}
