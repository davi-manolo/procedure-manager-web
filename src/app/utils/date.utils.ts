import { DateTime } from 'luxon';
export class DateUtils {

  static isExpired(milliseconds: number): boolean {
    const currentDateTime = DateTime.now();
    const targetDateTime = DateTime.fromMillis(milliseconds);
    return targetDateTime <= currentDateTime;
  }

}
