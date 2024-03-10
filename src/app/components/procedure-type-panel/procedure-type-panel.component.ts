import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProcedureType } from "../../models/procedure-type.model";
import { NgOptimizedImage } from "@angular/common";
import { ProcedureTypeDropdownComponent } from "../procedure-type-dropdown/procedure-type-dropdown.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "../../services/login/login.service";
import { Observable } from "rxjs";
import { DataProcedureTypeRequest } from "../../models/data-procedure-type-request.model";
import { ProcedureTypeService } from "../../services/procedure-type/procedure-type.service";
import {
  UpdateProcedureTypeTableEvent
} from "../../events/update-procedure-type-table/update-procedure-type-table.event";
import {TransportProcedureTypeEvent } from "../../events/transport-procedure-type/transport-procedure-type.event";

@Component({
  selector: 'app-procedure-type-panel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProcedureTypeDropdownComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './procedure-type-panel.component.html',
  styleUrl: './procedure-type-panel.component.css'
})
export class ProcedureTypePanelComponent implements OnInit {

  @Input() title: string = 'Title';
  @Input() buttonTitle: string = 'Button Title';
  @Input() isAddFlow: boolean = false;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  procedureType: ProcedureType = new ProcedureType();
  dataProcedureTypeRequest: DataProcedureTypeRequest = new DataProcedureTypeRequest();

  constructor(
    private loginService: LoginService,
    private procedureTypeService: ProcedureTypeService,
    private transportProcedureTypeEvent: TransportProcedureTypeEvent,
    private updateProcedureTypeTableEvent: UpdateProcedureTypeTableEvent
  ) {}

  ngOnInit(): void {
    if (!this.isAddFlow) {
      this.transportProcedureTypeEvent.getSelectedProcedureType().subscribe(procedureType =>
        this.procedureType = procedureType);
    }
  }

  isProcedureValid(): boolean {
    return (
      !this.procedureType?.name ||
      !this.procedureType?.percentage
    );
  }

  sendProcedureTypeToUpdate(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.dataProcedureTypeRequest.name = this.procedureType.name;
      this.dataProcedureTypeRequest.percentage = this.procedureType.percentage;

      const procedureServiceMethod: Observable<void> = this.isAddFlow
        ? this.procedureTypeService.addProcedureType(this.dataProcedureTypeRequest)
        : this.procedureTypeService.updateProcedureType(this.procedureType.procedureTypeId, this.dataProcedureTypeRequest);

      procedureServiceMethod.subscribe((): void => {
        this.onNewProcedureTypeAdded();
        this.closePanel()
      });
    }
  }

  onNewProcedureTypeAdded(): void {
    this.updateProcedureTypeTableEvent.procedureTypeAdded();
  }

  closePanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.close.emit();
    }
  }

}
