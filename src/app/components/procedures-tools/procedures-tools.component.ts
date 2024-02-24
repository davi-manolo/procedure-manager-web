import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { ProcedureDropdownComponent } from "../procedure-dropdown/procedure-dropdown.component";

@Component({
  selector: 'app-procedures-tools',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProcedureDropdownComponent
  ],
  templateUrl: './procedures-tools.component.html',
  styleUrl: './procedures-tools.component.css'
})
export class ProceduresToolsComponent {

}
