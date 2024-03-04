import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateProcedureTableEvent {

  private procedureAddedSource: Subject<void> = new Subject<void>();

  procedureAdded$: Observable<void> = this.procedureAddedSource.asObservable();

  procedureAdded(): void {
    this.procedureAddedSource.next();
  }

}
