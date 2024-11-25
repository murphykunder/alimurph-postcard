import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule, NgbTooltip],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavButtonComponent {

  @Input() active!: number;
  @Input() isSubmitting: boolean = false;
  @Input() isDownloading: boolean = false;
  @Output() return = new EventEmitter();
  @Output() export = new EventEmitter();

  onReturn(){
    this.return.emit();
  }

  onExport(){
    this.export.emit();
  }
}
