import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { LoginService } from "../../services/login/login.service";
import { TransportProcedureEvent } from "../../events/transport-procedure/transport-procedure.event";
import { Procedure } from "../../models/procedure.model";
import { FormsModule } from "@angular/forms";
import { ProcedureService } from "../../services/procedure/procedure.service";
import { ProcedureTypeDropdownComponent } from "../procedure-type-dropdown/procedure-type-dropdown.component";
import { TransportProcedureTypeEvent } from "../../events/transport-procedure-type/transport-procedure-type-event";
import { DataProcedureRequest } from "../../models/data-procedure-request.model";

@Component({
  selector: 'app-procedure-panel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    FormsModule,
    ProcedureTypeDropdownComponent
  ],
  templateUrl: './procedure-panel.component.html',
  styleUrl: './procedure-panel.component.css'
})
export class ProcedurePanelComponent implements OnInit {

  @Input() title: string = 'Title';
  @Input() buttonTitle: string = 'Button Title';
  @Input() isAddFlow: boolean = false;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  procedure: Procedure = new Procedure();
  dataProcedureRequest: DataProcedureRequest = new DataProcedureRequest();
  selectedProcedureTypeName: string = '';

  constructor(
    private loginService: LoginService,
    private procedureService: ProcedureService,
    private transportProcedureEvent: TransportProcedureEvent,
    private transportProcedureTypeEvent: TransportProcedureTypeEvent
  ) {}

  ngOnInit() {
    if (!this.isAddFlow) {
      this.transportProcedureEvent.selectedProcedure.subscribe(procedure => {
        this.procedure = procedure;
        this.selectedProcedureTypeName = procedure.procedureTypeName;
      });
    }
    this.transportProcedureTypeEvent.getSelectedProcedureType()
      .subscribe(procedureType => this.dataProcedureRequest.procedureTypeId = procedureType.procedureTypeId);
  }

  handleSelectionChange(selectedProcedureTypeName: string): void {
    this.selectedProcedureTypeName = selectedProcedureTypeName;
  }

  isProcedureValid() {
    return (
      !this.procedure ||
      !this.procedure.procedureDate ||
      !this.procedure.customer ||
      !this.procedure.procedureValue ||
      this.selectedProcedureTypeName == ''
    );
  }

  sendProcedureToUpdate() {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.dataProcedureRequest.procedureDate = this.procedure.procedureDate;
      this.dataProcedureRequest.customer = this.procedure.customer;
      this.dataProcedureRequest.value = this.procedure.procedureValue;

      const procedureServiceMethod = this.isAddFlow
        ? this.procedureService.addProcedure(this.dataProcedureRequest)
        : this.procedureService.updateProcedure(this.procedure.procedureId, this.dataProcedureRequest);

      procedureServiceMethod.subscribe(() => this.closePanel());
    }
  }

  closePanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.close.emit();
    }
  }

}
