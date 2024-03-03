import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { LoginService } from "../../services/login/login.service";
import { ProcedureTypeService } from "../../services/procedure-type/procedure-type.service";
import { ProcedureType } from "../../models/procedure-type.model";
import { TransportProcedureTypeEvent } from "../../events/transport-procedure-type/transport-procedure-type-event";

@Component({
  selector: 'app-procedure-type-dropdown',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './procedure-type-dropdown.component.html',
  styleUrl: './procedure-type-dropdown.component.css'
})
export class ProcedureTypeDropdownComponent implements OnInit {

  @Input() selectedItemText = 'Selecione o tipo de procedimento';

  @Output() selectionChange = new EventEmitter<string>();

  isOpen = false;
  procedureTypes: ProcedureType[] = [];
  selectedItemSubject = new BehaviorSubject<ProcedureType>(new ProcedureType());

  constructor(
    private transportProcedureTypeEvent: TransportProcedureTypeEvent,
    private loginService: LoginService,
    private procedureTypeService: ProcedureTypeService
  ) {}

  ngOnInit(): void {
    this.procedureTypeService.getProceduresTypes().subscribe(procedureTypes => this.procedureTypes = procedureTypes);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.isOpen) {
      return;
    }

    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }

  selectItem(item: ProcedureType) {
    this.selectedItemSubject.next(item);
    this.isOpen = false;
    this.selectedItemText = item.name;
    this.transportProcedureTypeEvent.setSelectedProcedureType(item);
    this.selectionChange.emit(item.name);
  }

  toggleDropdown() {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isOpen = !this.isOpen;
    }
  }

}
