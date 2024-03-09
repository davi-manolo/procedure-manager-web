import { Component, OnInit } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { ProcedureDropdownComponent } from "../procedure-dropdown/procedure-dropdown.component";
import { ProcedurePanelComponent } from "../procedure-panel/procedure-panel.component";
import { LoginService } from "../../services/login/login.service";
import { DatePeriod } from "../../models/date-period.model";
import { DatePeriodEvent } from "../../events/date-period/date-period.event";
import { ProcedureTypeTablePanelComponent } from "../procedure-type-table-panel/procedure-type-table-panel.component";

@Component({
  selector: 'app-procedures-tools',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProcedureDropdownComponent,
    NgIf,
    ProcedurePanelComponent,
    ProcedureTypeTablePanelComponent
  ],
  templateUrl: './procedures-tools.component.html',
  styleUrl: './procedures-tools.component.css'
})
export class ProceduresToolsComponent implements OnInit {

  isProcedureTypeTablePanelOpen: boolean = false;
  isProcedurePanelOpen: boolean = false;
  selectedDate: DatePeriod = new DatePeriod();

  constructor(
    private loginService: LoginService,
    private datePeriodEvent: DatePeriodEvent
  ) {}

  ngOnInit(): void {
    this.datePeriodEvent.getSelectedDate().subscribe((selectedDate: DatePeriod): DatePeriod => this.selectedDate = selectedDate);
  }

  procedureTypeTableStartPanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isProcedureTypeTablePanelOpen = true;
    }
  }

  closeProcedureTypeTablePanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isProcedureTypeTablePanelOpen = false;
    }
  }

  newProcedureToAddAndStartPanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isProcedurePanelOpen = true;
    }
  }

  closeProcedurePanel(): void {
    this.isProcedurePanelOpen = false;
  }

  isDisableAddNewProcedure(): boolean {
    const datePeriodCurrent: DatePeriod = new DatePeriod();
    return datePeriodCurrent.month === this.selectedDate.month &&
      datePeriodCurrent.year === this.selectedDate.year;
  }

}
