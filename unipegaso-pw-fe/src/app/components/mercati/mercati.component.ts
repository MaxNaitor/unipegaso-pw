import { Component, OnInit } from '@angular/core';
import { AlphaVantageService } from '../services/alpha-vantage.service';

@Component({
  selector: 'app-mercati',
  imports: [],
  templateUrl: './mercati.component.html',
  styleUrl: './mercati.component.css'
})
export class MercatiComponent implements OnInit {

  constructor(private alphaVantageService: AlphaVantageService) {}


  ngOnInit(): void {
  }

}
