import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Transazione } from '../../models/transazione';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MarketService } from '../../services/market.service';
import { USERNAME_UTENTE } from '../../constants/constants';

@Component({
  selector: 'app-storico-transazioni',
  imports: [TableModule,DatePipe,CurrencyPipe, CommonModule],
  templateUrl: './storico-transazioni.component.html',
  styleUrl: './storico-transazioni.component.css'
})
export class StoricoTransazioniComponent implements OnInit,OnChanges{

  @Input()
  usernameUtente?: string

  transazioni: Transazione[] = []

  constructor (private marketService: MarketService) { }

  ngOnInit(): void {
        this.marketService.getTransazioniUtente(sessionStorage.getItem(USERNAME_UTENTE)!).subscribe((res: any) => {
        this.transazioni = res;
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.usernameUtente = changes['usernameUtente'].currentValue
    if (this.usernameUtente) {
      this.marketService.getTransazioniUtente(this.usernameUtente!).subscribe((res: any) => {
        this.transazioni = res;
      })
    }
  }


}
