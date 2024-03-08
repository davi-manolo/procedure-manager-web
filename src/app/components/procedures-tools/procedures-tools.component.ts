import { Component, OnInit } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { ProcedureDropdownComponent } from "../procedure-dropdown/procedure-dropdown.component";
import { ProcedurePanelComponent } from "../procedure-panel/procedure-panel.component";
import { LoginService } from "../../services/login/login.service";
import { DatePeriod } from "../../models/date-period.model";
import { DatePeriodEvent } from "../../events/date-period/date-period.event";
import { ProcedureTypePanelComponent } from "../procedure-type-panel/procedure-type-panel.component";

@Component({
  selector: 'app-procedures-tools',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProcedureDropdownComponent,
    NgIf,
    ProcedurePanelComponent,
    ProcedureTypePanelComponent
  ],
  templateUrl: './procedures-tools.component.html',
  styleUrl: './procedures-tools.component.css'
})
export class ProceduresToolsComponent implements OnInit {

  isProcedureTypePanelOpen: boolean = false;
  isProcedurePanelOpen: boolean = false;
  selectedDate: DatePeriod = new DatePeriod();

  constructor(
    private loginService: LoginService,
    private datePeriodEvent: DatePeriodEvent
  ) {}

  ngOnInit(): void {
    this.datePeriodEvent.getSelectedDate().subscribe((selectedDate: DatePeriod): DatePeriod => this.selectedDate = selectedDate);
  }

  procedureTypeStartPanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isProcedureTypePanelOpen = true;
    }
  }

  closeProcedureTypePanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isProcedureTypePanelOpen = false;
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
