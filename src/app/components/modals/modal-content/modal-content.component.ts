import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [CommonModule, NgbTooltip],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ModalContentComponent {

  activeModal = inject(NgbActiveModal);
  @Input() cardUrl: string | undefined;
  @Input() errorMessage: string | undefined;


  onCopy(tooltip: NgbTooltip){
    if(this.cardUrl){
      navigator.clipboard.writeText(this.cardUrl);
      tooltip.open();
      setTimeout(() => {
        tooltip.close(true);
      }, 1000);
    }
  }

}
