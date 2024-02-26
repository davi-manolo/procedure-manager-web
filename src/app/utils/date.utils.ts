import { DateTime } from 'luxon';
import { DatePeriod } from "../models/date-period.model";
export class DateUtils {

  static isExpired(milliseconds: number): boolean {
    const currentDateTime = DateTime.now();
    const targetDateTime = DateTime.fromMillis(milliseconds);
    return targetDateTime <= currentDateTime;
  }

  static getMonthNameByDate(date: Date): string {
    const monthName = date.toLocaleString('pt-BR', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }

  static getMonthNameByDatePeriod(datePeriod: DatePeriod): string {
    const date = this.datePeriodToDate(datePeriod);
    return this.getMonthNameByDate(date);
  }

  static getPreviousMonthNameByDatePeriod(datePeriod: DatePeriod): string {
    const previousDatePeriod: DatePeriod = {
      month: datePeriod.month - 1,
      year: datePeriod.year,
      monthName: datePeriod.monthName
    }
    return this.getMonthNameByDatePeriod(previousDatePeriod);
  }

  static datePeriodToDate(datePeriod: DatePeriod): Date {
    return new Date(datePeriod.year, datePeriod.month - 1, 1)
  }

}
