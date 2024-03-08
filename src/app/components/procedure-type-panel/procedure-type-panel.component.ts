import { Component } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { ProcedureTypeDropdownComponent } from "../procedure-type-dropdown/procedure-type-dropdown.component";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-procedure-type-panel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProcedureTypeDropdownComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './procedure-type-panel.component.html',
  styleUrl: './procedure-type-panel.component.css'
})
export class ProcedureTypePanelComponent {

  protected readonly math = Math;

}
