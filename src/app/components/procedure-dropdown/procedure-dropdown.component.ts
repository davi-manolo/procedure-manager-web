import { Component, HostListener, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { DatePeriod } from "../../models/date-period.model";

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

  isOpen = false;
  dropdownItems: DatePeriod[] = [];
  selectedItemText = 'Selecione';
  selectedItemSubject = new BehaviorSubject<DatePeriod>(new DatePeriod());

  constructor() {}

  ngOnInit(): void {
    this.getMonths(3);
    this.selectItem(this.dropdownItems[0]);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.isOpen) {
      return;
    }

    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }

  selectItem(item: DatePeriod) {
    this.selectedItemSubject.next(item);
    this.isOpen = false;
    this.selectedItemText = item.monthName;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  private getMonths(months: number) {
    const today = new Date();

    for (let i = 0; i < months; i++) {
      const previousMonth = new Date(today);
      previousMonth.setMonth(today.getMonth() - i);

      const datePeriod: DatePeriod = {
        month: previousMonth.getMonth() + 1,
        year: previousMonth.getFullYear(),
        monthName: this.getMonthName(previousMonth),
      };

      this.dropdownItems.push(datePeriod);
    }
  }

  private getMonthName(date: Date): string {
    const monthName = date.toLocaleString('pt-BR', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }

}
