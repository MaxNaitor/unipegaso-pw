import { Component, OnInit } from '@angular/core';
import { MarketService } from '../services/market.service';
import { TableModule } from 'primeng/table';
import { Transazione } from '../../models/transazione';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-storico-transazioni',
  imports: [TableModule,DatePipe,CurrencyPipe],
  templateUrl: './storico-transazioni.component.html',
  styleUrl: './storico-transazioni.component.css'
})
export class StoricoTransazioniComponent implements OnInit{

  transazioni: Transazione[] = []

  constructor (private marketService: MarketService) { }

  ngOnInit(): void {
    this.marketService.getTransazioniUtente(sessionStorage.getItem('usernameUtente')!).subscribe((res: any) => {
      this.transazioni = res;
      console.log(this.transazioni)
    })
  }


}
