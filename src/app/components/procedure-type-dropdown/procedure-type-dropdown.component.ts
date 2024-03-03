import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { LoginService } from "../../services/login/login.service";
import { ProcedureTypeService } from "../../services/procedure-type/procedure-type.service";
import { ProcedureType } from "../../models/procedure-type.model";
import { TransportProcedureTypeEvent } from "../../events/transport-procedure-type/transport-procedure-type.event";

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

  @Input() selectedProcedureTypeName: string = '';

  @Output() selectionChange: EventEmitter<string>  = new EventEmitter<string>();

  isOpen: boolean = false;
  procedureTypes: ProcedureType[] = [];
  selectedProcedureTypeSubject: BehaviorSubject<ProcedureType> = new BehaviorSubject<ProcedureType>(new ProcedureType());

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

    const clickedElement: HTMLElement = event.target as HTMLElement;
    if (!clickedElement.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }

  selectProcedureType(item: ProcedureType): void {
    this.selectedProcedureTypeSubject.next(item);
    this.isOpen = false;
    this.selectedProcedureTypeName = item.name;
    this.transportProcedureTypeEvent.setSelectedProcedureType(item);
    this.selectionChange.emit(item.name);
  }

  toggleDropdown(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isOpen = !this.isOpen;
    }
  }

}
