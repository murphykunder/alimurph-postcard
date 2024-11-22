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
    // backend hosted on render.com which tends to spin down free instances which do not receive requests for more than 15 mins. The free instance takes approx 1 min to start up.
    // To prevent slowness trigger call to backend when home page loads
      this.postcardService.getStatus().subscribe({
        next: (response) => console.log(response)
      })
  }

}
