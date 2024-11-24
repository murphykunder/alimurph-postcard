import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FlashMessageService } from '../../services/flash-message.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flash-message-container',
  standalone: true,
  imports: [NgbToastModule],
  templateUrl: './flash-message-container.component.html',
  styleUrl: './flash-message-container.component.scss',
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200'
  },
  encapsulation: ViewEncapsulation.None
})
export class FlashMessageContainerComponent {
  flashMessageService = inject(FlashMessageService)
}
