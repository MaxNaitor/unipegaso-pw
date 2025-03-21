import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from "./components/header/header.component";
import { AlphaVantageService } from './services/alpha-vantage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'unipegaso-pw-fe';

  constructor(private alphaVantageService: AlphaVantageService) {}
}
