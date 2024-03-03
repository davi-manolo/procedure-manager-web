import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DatePeriod } from "../../models/date-period.model";

@Injectable({
  providedIn: 'root'
})
export class DatePeriodEvent {

  private selectedDateSubject: BehaviorSubject<DatePeriod> = new BehaviorSubject<DatePeriod>(new DatePeriod());

  getSelectedDate(): Observable<DatePeriod> {
    return this.selectedDateSubject.asObservable();
  }

  setSelectedDate(datePeriod: DatePeriod): void {
    this.selectedDateSubject.next(datePeriod);
  }

}
