import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgClass, NgIf, NgOptimizedImage } from "@angular/common";
import { AccountingService } from "../../services/accounting/accounting.service";
import { DatePeriodEvent } from "../../events/date-period/date-period.event";
import { DatePeriod } from "../../models/date-period.model";
import { DateUtils } from "../../utils/date.utils";

@Component({
  selector: 'app-procedures-summary',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    NgClass,
    NgIf
  ],
  templateUrl: './procedures-summary.component.html',
  styleUrl: './procedures-summary.component.css'
})
export class ProceduresSummaryComponent implements OnInit {

  totalReceivedAvg = 0;
  totalProcedureAmountAvg = 0;
  totalProcedureAmount = 0;
  totalReceived = 0;

  totalReceivedAvgPrev = 0;
  totalProcedureAmountAvgPrev = 0;
  totalProcedureAmountPrev = 0;
  totalReceivedPrev = 0;

  selectedPreviousMonth = ''

  constructor(private accountingService: AccountingService, private datePeriodEvent: DatePeriodEvent) {}

  ngOnInit(): void {
    this.datePeriodEvent.getSelectedDate().subscribe((datePeriodEvent) => {
      this.updateProcedureSummary(datePeriodEvent);
    });
  }

  private updateProcedureSummary(selectedDate: DatePeriod) {
    this.accountingService.getTotalReceivedAvg(selectedDate).subscribe(
      totalReceivedAvg => this.totalReceivedAvg = totalReceivedAvg)
    this.accountingService.getTotalProceduresPerformedAvg(selectedDate).subscribe(
      totalProcedureAmountAvg => this.totalProcedureAmountAvg = totalProcedureAmountAvg)
    this.accountingService.getTotalProceduresPerformed(selectedDate).subscribe(
      totalProcedureAmount => this.totalProcedureAmount = totalProcedureAmount)
    this.accountingService.getTotalReceived(selectedDate).subscribe(
      totalReceived => this.totalReceived = totalReceived)

    this.accountingService.getTotalReceivedAvgPrevious(selectedDate).subscribe(
      totalReceivedAvgPrev => this.totalReceivedAvgPrev = totalReceivedAvgPrev)
    this.accountingService.getTotalProceduresPerformedAvgPrevious(selectedDate).subscribe(
      totalProcedureAmountAvgPrev => this.totalProcedureAmountAvgPrev = totalProcedureAmountAvgPrev)
    this.accountingService.getTotalProceduresPerformedPrevious(selectedDate).subscribe(
      totalProcedureAmountPrev => this.totalProcedureAmountPrev = totalProcedureAmountPrev)
    this.accountingService.getTotalReceivedPrevious(selectedDate).subscribe(
      totalReceivedPrev => this.totalReceivedPrev = totalReceivedPrev)

    this.selectedPreviousMonth = DateUtils.getPreviousMonthNameByDatePeriod(selectedDate);
  }

}
