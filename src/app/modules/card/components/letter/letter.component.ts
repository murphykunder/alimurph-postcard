import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Postcard } from '../../../../services/models';
import { CakeComponent } from '../cake/cake.component';

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [CommonModule, CakeComponent],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.scss'
})
export class LetterComponent {

  @Input() isEnvelopeOpen: boolean = false;
  @Input() cardData!: Postcard | undefined;
  public sanitizer = inject(DomSanitizer);

  get receiverName() {
    return this.cardData?.to;
  }

  get message() {
    return this.cardData?.message;
  }

  get occasion() {
    return this.cardData?.occasion;
  }

}
