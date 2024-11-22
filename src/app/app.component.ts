import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostcardService } from './services/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'alimurph-postcard-ui';
  
  constructor(
    private postcardService: PostcardService
  ){}

  ngOnInit(): void {
    // backend hosted on render.com which tends to spin down free instances which do not receive requests for more than 15 mins. The free instance takes approx 1 min to start up.
    // To prevent slowness trigger call to backend when any page loads
      this.postcardService.getStatus().subscribe({
        next: (response: any) => console.log(response)
      })
  }
}
