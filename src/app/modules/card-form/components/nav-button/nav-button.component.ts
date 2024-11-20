import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss'
})
export class NavButtonComponent {

  @Input() active!: number;
  @Input() isSubmitting: boolean = false;
  @Output() return = new EventEmitter();

  onReturn(){
    this.return.emit();
  }
}
