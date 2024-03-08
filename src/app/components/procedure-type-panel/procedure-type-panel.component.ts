import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { ProcedureTypeDropdownComponent } from "../procedure-type-dropdown/procedure-type-dropdown.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "../../services/login/login.service";
import { ProcedureType } from "../../models/procedure-type.model";
import { ProcedureTypeService } from "../../services/procedure-type/procedure-type.service";
import { DeletePanelComponent } from "../delete-panel/delete-panel.component";

@Component({
  selector: 'app-procedure-type-panel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProcedureTypeDropdownComponent,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    DeletePanelComponent
  ],
  templateUrl: './procedure-type-panel.component.html',
  styleUrl: './procedure-type-panel.component.css'
})
export class ProcedureTypePanelComponent implements OnInit {

  protected readonly math = Math;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  procedureTypeList: ProcedureType[] = []
  itemsPerPage: number = 8;
  currentPage: number = 1;

  isDeletePanelOpen: boolean = false;
  private procedureTypeToDelete: ProcedureType | null = null;

  constructor(
    private loginService: LoginService,
    private procedureTypeService: ProcedureTypeService,
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

  setProcedureToDeleteAndStartPanel(item: any): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.procedureTypeToDelete = item;
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
