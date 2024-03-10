import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CurrencyPipe, DecimalPipe, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { ProcedureTypeDropdownComponent } from "../procedure-type-dropdown/procedure-type-dropdown.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "../../services/login/login.service";
import { ProcedureType } from "../../models/procedure-type.model";
import { ProcedureTypeService } from "../../services/procedure-type/procedure-type.service";
import { DeletePanelComponent } from "../delete-panel/delete-panel.component";
import { TransportProcedureTypeEvent } from "../../events/transport-procedure-type/transport-procedure-type.event";
import { ProcedurePanelComponent } from "../procedure-panel/procedure-panel.component";
import { ProcedureTypePanelComponent } from "../procedure-type-panel/procedure-type-panel.component";

@Component({
  selector: 'app-procedure-type-table-panel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProcedureTypeDropdownComponent,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    DeletePanelComponent,
    ProcedurePanelComponent,
    ProcedureTypePanelComponent,
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: './procedure-type-table-panel.component.html',
  styleUrl: './procedure-type-table-panel.component.css'
})
export class ProcedureTypeTablePanelComponent implements OnInit {

  protected readonly math: Math = Math;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  procedureTypeList: ProcedureType[] = []
  itemsPerPage: number = 8;
  currentPage: number = 1;

  isDeletePanelOpen: boolean = false;
  isProcedureTypePanelOpen: boolean = false;

  isAddMode: boolean = false;
  procedurePanelTitle: string = '';
  procedurePanelButtonTitle: string = '';

  private procedureTypeToDelete: ProcedureType | null = null;

  constructor(
    private loginService: LoginService,
    private procedureTypeService: ProcedureTypeService,
    private transportProcedureTypeEvent: TransportProcedureTypeEvent,
  ) {}

  ngOnInit(): void {
    this.updateProcedureTypeTable()
  }

  get paginatedItems() {
    const startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex: number = startIndex + this.itemsPerPage;
    return this.procedureTypeList.slice(startIndex, endIndex);
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    const pageCount: number = Math.ceil(this.procedureTypeList.length / this.itemsPerPage);
    return this.currentPage === pageCount;
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }

  procedureTypeStartPanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isProcedureTypePanelOpen = true;
      this.isAddMode = true;
      this.procedurePanelTitle = 'Adicionar Tipo Procedimento';
      this.procedurePanelButtonTitle = 'Adicionar';
      this.isProcedureTypePanelOpen = true;
    }
  }

  setProcedureTypeToEditAndStartPanel(procedureType: ProcedureType): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.isProcedureTypePanelOpen = true;
      this.isAddMode = false;
      this.procedurePanelTitle = 'Editar Tipo Procedimento';
      this.procedurePanelButtonTitle = 'Salvar Edição';
      this.transportProcedureTypeEvent.setSelectedProcedureType(procedureType)
      this.isProcedureTypePanelOpen = true;
    }
  }

  setProcedureTypeToDeleteAndStartPanel(procedureType: ProcedureType): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.procedureTypeToDelete = procedureType;
      this.isDeletePanelOpen = true;
    }
  }

  closePanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.close.emit();
    }
  }

  confirmDeleteProcedureAction(): void {
    this.procedureTypeService.deleteProcedure(this.procedureTypeToDelete!.procedureTypeId).subscribe((): void => {
      this.updateProcedureTypeTable();
      this.closeDeletePanel();
    });
  }

  closeProcedureTypePanel(): void {
    this.isProcedureTypePanelOpen = false;
    this.updateProcedureTypeTable();
  }

  closeDeletePanel(): void {
    this.isDeletePanelOpen = false;
    this.procedureTypeToDelete = null;
    this.updateProcedureTypeTable();
  }

  private updateProcedureTypeTable(): void {
    this.procedureTypeService.getProceduresTypes().subscribe((procedureTypeList): void => {
      this.procedureTypeList = procedureTypeList;
    });
  }

}
