import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cake',
  standalone: true,
  imports: [],
  templateUrl: './cake.component.html',
  styleUrl: './cake.component.scss'
})
export class CakeComponent {

  @Input() occasion!: string | undefined;
}
