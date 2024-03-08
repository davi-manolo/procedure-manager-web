import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { LoginService } from "../../services/login/login.service";

@Component({
  selector: 'app-delete-panel',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './delete-panel.component.html',
  styleUrl: './delete-panel.component.css'
})
export class DeletePanelComponent {

  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() text: string = '';

  constructor(private loginService: LoginService) {}

  confirmDelete(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.confirm.emit();
    }
  }

  cancelDelete(): void {
    if (this.loginService.isTokenExpiredThenRedirect()) {
      this.cancel.emit();
    }
  }

}
