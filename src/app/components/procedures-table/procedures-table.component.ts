import { Component, OnInit } from '@angular/core';
import { ProcedureService } from "../../services/procedure/procedure.service";
import { Procedure } from "../../models/procedure.model";
import { CurrencyPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { DatePeriodEvent } from "../../events/date-period/date-period.event";
import { DatePeriod } from "../../models/date-period.model";
import { DeletePanelComponent } from "../delete-panel/delete-panel.component";
import { LoginService } from "../../services/login/login.service";
import { ProcedurePanelComponent } from "../procedure-panel/procedure-panel.component";
import { TransportProcedureEvent } from "../../events/transport-procedure/transport-procedure.event";

@Component({
  selector: 'app-procedures-table',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe,
    NgOptimizedImage,
    NgIf,
    DeletePanelComponent,
    ProcedurePanelComponent
  ],
  templateUrl: './procedures-table.component.html',
  styleUrl: './procedures-table.component.css'
})
export class ProceduresTableComponent implements OnInit {

  protected readonly math: Math = Math;

  procedureList: Procedure[] = []
  itemsPerPage: number = 15;
  currentPage: number = 1;

  isDeletePanelOpen: boolean = false;
  isProcedurePanelOpen: boolean = false;

  procedureToDelete: Procedure | null = null;

  selectedDate: DatePeriod = new DatePeriod();

  constructor(
    private procedureService: ProcedureService,
    private loginService: LoginService,
    private datePeriodEvent: DatePeriodEvent,
    private transportProcedureEvent: TransportProcedureEvent
  ) {}

  ngOnInit(): void {
    this.datePeriodEvent.getSelectedDate().subscribe((selectedDate: DatePeriod): void => {
      this.updateProcedureTableWithPeriodDate(selectedDate);
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    const pageCount = Math.ceil(this.procedureList.length / this.itemsPerPage);
    return this.currentPage === pageCount;
  }

  get paginatedItems() {
    const startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex: number = startIndex + this.itemsPerPage;
    return this.procedureList.slice(startIndex, endIndex);
  }

  setProcedureToDeleteAndStartPanel(item: any): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.procedureToDelete = item;
      this.isDeletePanelOpen = true;
    }
  }
  setProcedureToEditAndStartPanel(item: any): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.transportProcedureEvent.setSelectedProcedure(item)
      this.isProcedurePanelOpen = true;
    }
  }

  confirmDeleteProcedureAction(): void {
    this.procedureService.deleteProcedure(this.procedureToDelete!.procedureId).subscribe((): void => {
      this.updateProcedureSummaryAndTable();
      this.closeDeletePanel();
    });
  }

  closeDeletePanel(): void {
    this.isDeletePanelOpen = false;
    this.procedureToDelete = null;
    this.updateProcedureSummaryAndTable();
  }

  closeProcedurePanel(): void {
    this.isProcedurePanelOpen = false;
    this.updateProcedureSummaryAndTable();
  }

  updateProcedureSummaryAndTable(): void {
    this.updateProcedureSummary();
    this.updateProcedureTable();
  }

  private updateProcedureTableWithPeriodDate(selectedDate: DatePeriod): void {
    this.procedureService.getProceduresByPeriod(selectedDate).subscribe((procedureList): void => {
      this.selectedDate = selectedDate;
      this.procedureList = procedureList;
    });
  }

  private updateProcedureTable(): void {
    this.procedureService.getProceduresByPeriod(this.selectedDate).subscribe((procedureList): void => {
      this.procedureList = procedureList;
    });
  }

  private updateProcedureSummary(): void {
    this.datePeriodEvent.setSelectedDate(this.selectedDate);
  }

}
