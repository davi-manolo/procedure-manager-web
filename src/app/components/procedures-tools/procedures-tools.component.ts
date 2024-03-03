import { Component } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { ProcedureDropdownComponent } from "../procedure-dropdown/procedure-dropdown.component";
import { ProcedurePanelComponent } from "../procedure-panel/procedure-panel.component";
import { LoginService } from "../../services/login/login.service";

@Component({
  selector: 'app-procedures-tools',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProcedureDropdownComponent,
    NgIf,
    ProcedurePanelComponent
  ],
  templateUrl: './procedures-tools.component.html',
  styleUrl: './procedures-tools.component.css'
})
export class ProceduresToolsComponent {

  isProcedurePanelOpen: boolean = false;

  constructor(private loginService: LoginService) {}

  newProcedureToAddAndStartPanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isProcedurePanelOpen = true;
    }
  }

  closeProcedurePanel(): void {
    this.isProcedurePanelOpen = false;
  }

}
