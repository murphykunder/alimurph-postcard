import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { PostcardService } from '../../../../services/services';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  constructor(
    private postcardService: PostcardService
  ){}

  ngOnInit(): void {
      this.postcardService.getStatus().subscribe({
        next: (response) => console.log(response)
      })
  }

}
