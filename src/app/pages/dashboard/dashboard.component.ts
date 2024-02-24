import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ProceduresTableComponent } from "../../components/procedures-table/procedures-table.component";
import { ProceduresSummaryComponent } from "../../components/procedures-summary/procedures-summary.component";
import { ProceduresToolsComponent } from "../../components/procedures-tools/procedures-tools.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    ProceduresTableComponent,
    ProceduresSummaryComponent,
    ProceduresToolsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
