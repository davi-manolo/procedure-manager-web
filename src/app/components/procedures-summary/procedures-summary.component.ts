import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgClass, NgIf, NgOptimizedImage } from "@angular/common";
import { AccountingService } from "../../services/accounting/accounting.service";

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

  constructor(private accountingService: AccountingService) {}

  ngOnInit(): void {
    this.accountingService.getTotalReceivedAvg().subscribe(totalReceivedAvg => this.totalReceivedAvg = totalReceivedAvg)
    this.accountingService.getTotalProceduresPerformedAvg().subscribe(totalProcedureAmountAvg => this.totalProcedureAmountAvg = totalProcedureAmountAvg)
    this.accountingService.getTotalProceduresPerformed().subscribe(totalProcedureAmount => this.totalProcedureAmount = totalProcedureAmount)
    this.accountingService.getTotalReceived().subscribe(totalReceived => this.totalReceived = totalReceived)

    this.accountingService.getTotalReceivedAvgPrevious().subscribe(totalReceivedAvgPrev => this.totalReceivedAvgPrev = totalReceivedAvgPrev)
    this.accountingService.getTotalProceduresPerformedAvgPrevious().subscribe(totalProcedureAmountAvgPrev => this.totalProcedureAmountAvgPrev = totalProcedureAmountAvgPrev)
    this.accountingService.getTotalProceduresPerformedPrevious().subscribe(totalProcedureAmountPrev => this.totalProcedureAmountPrev = totalProcedureAmountPrev)
    this.accountingService.getTotalReceivedPrevious().subscribe(totalReceivedPrev => this.totalReceivedPrev = totalReceivedPrev)
  }

}
