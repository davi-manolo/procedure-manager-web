import { Component, OnInit } from '@angular/core';
import { ProcedureService } from "../../services/procedure/procedure.service";
import { Procedure } from "../../models/procedure.model";
import { CurrencyPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { DatePeriodService } from "../../services/date-period/date-period.service";
import { DatePeriod } from "../../models/date-period.model";

@Component({
  selector: 'app-procedures-table',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './procedures-table.component.html',
  styleUrl: './procedures-table.component.css'
})
export class ProceduresTableComponent implements OnInit {

  protected readonly Math = Math;

  procedureList: Procedure[] = []
  itemsPerPage = 15;
  currentPage = 1;

  constructor(private procedureService: ProcedureService, private datePeriodService: DatePeriodService) {}

  ngOnInit(): void {
    this.datePeriodService.getSelectedDate().subscribe((selectedDate) => {
      this.updateProcedureTable(selectedDate);
    });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  isFirstPage() {
    return this.currentPage === 1;
  }

  isLastPage() {
    const pageCount = Math.ceil(this.procedureList.length / this.itemsPerPage);
    return this.currentPage === pageCount;
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.procedureList.slice(startIndex, endIndex);
  }

  private updateProcedureTable(selectedDate: DatePeriod) {
    this.procedureService.getProceduresByPeriod(selectedDate).subscribe((procedureList) => {
      this.procedureList = procedureList;
    });
  }

}
