import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { LoginService } from "../../services/login/login.service";
import { TransportProcedureEvent } from "../../events/transport-procedure/transport-procedure.event";
import { Procedure } from "../../models/procedure.model";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-procedure-panel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './procedure-panel.component.html',
  styleUrl: './procedure-panel.component.css'
})
export class ProcedurePanelComponent implements OnInit {

  @Input() title: string = 'Title';
  @Input() buttonTitle: string = 'Button Title';

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  procedure: Procedure | null = null;

  constructor(private loginService: LoginService, private transportProcedureEvent: TransportProcedureEvent) {}

  ngOnInit() {
    this.transportProcedureEvent.selectedProcedure.subscribe(procedure => this.procedure = procedure);
  }

  closePanel(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.close.emit();
    }
  }

}
