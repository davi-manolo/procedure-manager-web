import { DateUtils } from "../utils/date.utils";

export class DatePeriod {

  month: number
  year: number
  monthName: string

  constructor() {
    const dateNow: Date = new Date();
    this.month = dateNow.getMonth() + 1;
    this.year = dateNow.getFullYear();
    this.monthName = DateUtils.getMonthNameByDate(dateNow);
  }

}
