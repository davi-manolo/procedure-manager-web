import { Component, EventEmitter, Output } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

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

  confirmDelete(): void {
    this.confirm.emit();
  }

  cancelDelete(): void {
    this.cancel.emit();
  }

}
