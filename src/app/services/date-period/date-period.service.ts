import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DatePeriod } from "../../models/date-period.model";

@Injectable({
  providedIn: 'root'
})
export class DatePeriodService {

  private selectedDateSubject = new BehaviorSubject<DatePeriod>(new DatePeriod());

  getSelectedDate(): Observable<DatePeriod> {
    return this.selectedDateSubject.asObservable();
  }

  setSelectedDate(datePeriod: DatePeriod) {
    this.selectedDateSubject.next(datePeriod);
  }

}
