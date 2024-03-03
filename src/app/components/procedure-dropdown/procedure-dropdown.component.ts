import { Component, HostListener, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { DatePeriod } from "../../models/date-period.model";
import { DatePeriodEvent } from "../../events/date-period/date-period.event";
import { DateUtils } from "../../utils/date.utils";
import { LoginService } from "../../services/login/login.service";

@Component({
  selector: 'app-procedure-dropdown',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    AsyncPipe,
    NgOptimizedImage
  ],
  templateUrl: './procedure-dropdown.component.html',
  styleUrl: './procedure-dropdown.component.css'
})
export class ProcedureDropdownComponent implements OnInit {

  isOpen: boolean = false;
  dropdownItems: DatePeriod[] = [];
  selectedItemText: string = 'Selecione';
  selectedItemSubject: BehaviorSubject<DatePeriod> = new BehaviorSubject<DatePeriod>(new DatePeriod());

  constructor(private datePeriodEvent: DatePeriodEvent, private loginService: LoginService) {}

  ngOnInit(): void {
    this.getMonths(3);
    this.selectItem(this.dropdownItems[0]);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (!this.isOpen) {
      return;
    }

    const clickedElement: HTMLElement = event.target as HTMLElement;
    if (!clickedElement.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }

  selectItem(item: DatePeriod): void {
    this.selectedItemSubject.next(item);
    this.isOpen = false;
    this.selectedItemText = item.monthName;
    this.datePeriodEvent.setSelectedDate(item);
  }

  toggleDropdown(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isOpen = !this.isOpen;
    }
  }

  private getMonths(months: number): void {
    const today: Date = new Date();

    for (let i: number = 0; i < months; i++) {
      const previousMonth: Date = new Date(today);
      previousMonth.setMonth(today.getMonth() - i);

      const datePeriod: DatePeriod = {
        month: previousMonth.getMonth() + 1,
        year: previousMonth.getFullYear(),
        monthName: DateUtils.getMonthNameByDate(previousMonth),
      };

      this.dropdownItems.push(datePeriod);
    }
  }

}
