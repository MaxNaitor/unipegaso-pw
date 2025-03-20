import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketEnpoints } from '../../constants/constants';
import { Ordine } from '../../models/ordine';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  getAvailableAssets() {
    return this.http.get(MarketEnpoints.AVAILABLE_ASSETS)
  }

  eseguiOrdine(ordine: Ordine) {
    return this.http.post(MarketEnpoints.ESEGUI_ORDINE,ordine)
  }

  getTransazioniUtente(usernameUtente: string) {
    return this.http.get(MarketEnpoints.GET_TRANSAZIONI_UTENTE.replace('{usernameUtente}',usernameUtente))
  }
}
