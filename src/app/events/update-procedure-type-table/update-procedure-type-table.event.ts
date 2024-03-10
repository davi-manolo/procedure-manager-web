import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateProcedureTypeTableEvent {

  private procedureTypeAddedSource: Subject<void> = new Subject<void>();

  procedureTypeAdded$: Observable<void> = this.procedureTypeAddedSource.asObservable();

  procedureTypeAdded(): void {
    this.procedureTypeAddedSource.next();
  }

}
