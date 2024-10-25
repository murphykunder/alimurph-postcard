import { Component } from '@angular/core';
import { PostcardFormComponent } from '../../components/postcard-form/postcard-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostcardFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
