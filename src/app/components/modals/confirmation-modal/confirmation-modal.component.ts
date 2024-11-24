import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {

  activeModal = inject(NgbActiveModal);
  @Input() message: string | undefined;
  @Output() result = new EventEmitter<boolean>();

  onCancel(){
    this.result.emit(false);
    this.activeModal.close();
  }

  onConfirm(){
    this.result.emit(true);
    this.activeModal.close();
  }

}
