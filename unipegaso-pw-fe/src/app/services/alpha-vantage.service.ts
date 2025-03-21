import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MarketService } from './market.service';
import { Asset } from '../models/asset';
import { Price } from '../models/price';
import { Utente } from '../models/utente';

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {

  private ALPHA_VANTAGE_URL = "https://www.alphavantage.co/query"
  private ALPHA_VANTAGE_API_KEY = "TRVRG2U65SRDZUXF"

  assetData: any
  availableAssets: Asset[] = []

  constructor(private http: HttpClient, private marketService: MarketService) {
    //RECUPERO I TICKER DEGLI ASSET DISPONIBILI E CONTROLLO SE DEVO AGGIORNARE I PREZZI
    this.marketService.getAvailableAssets().subscribe((res: any) => {
      this.availableAssets = res
      this.checkStockPricesUpdate()
    })
  }

  private checkStockPricesUpdate() {
    //RECUPERO L'ANDAMENTO DI PREZZO DELL'ULTIMA SETTIMANA PER GLI ASSET DISPONIBILI
    //E LI SALVO IN LOCAL STORAGE PER LIMITARE LE CHIAMATE ALL'API, SE NON L'HO GIA' FATTO OGGI
    let lastAssetUpdate = localStorage.getItem('lastAssetsUpdate')
    if (lastAssetUpdate) {
      let lastAssetUpdateDate: Date = JSON.parse(lastAssetUpdate)
      let oggi = new Date()
      if (!this.stessoGiorno(oggi, lastAssetUpdateDate)) {
        this.getLastWeekStockPrices()
      }
    } else {
      this.getLastWeekStockPrices()
    }
  }

  private getLastWeekStockPrices() {
    let savedAssetsData: Asset[] = []
    this.availableAssets.forEach(asset => {
      this.retrieveAssetDataFromAlphaVantage(asset.ticker).subscribe(res => {
        const timeSeries = res['Time Series (Daily)'];
        let prices: Price[] = []

        let pricesCount = 0;
        for (const date in timeSeries) {
          if (timeSeries.hasOwnProperty(date)) {
            let price = new Price()
            price.priceDate = date
            price.openPrice = timeSeries[date]['1. open']
            price.closePrice = timeSeries[date]['4. close']
            prices.push(price);
            pricesCount++
          }
          if (pricesCount >= 7) break;
        }
        asset.prezzi = prices
        savedAssetsData.push(asset)
        localStorage.setItem('savedAssetsData', JSON.stringify(savedAssetsData))
        localStorage.setItem('lastAssetsUpdate', JSON.stringify(new Date()))
      })
    })
  }

  private retrieveAssetDataFromAlphaVantage(ticker: string): Observable<any> {
    const params = new HttpParams()
      .set('function', 'TIME_SERIES_DAILY')
      .set('symbol', ticker)
      .set('apikey', this.ALPHA_VANTAGE_API_KEY);
    return this.http.get(this.ALPHA_VANTAGE_URL, { params });
  }

   //RESTITUISCE I DATI DELL'ASSET, CERCANDOLI NEL LOCAL STORAGE
  getAssetData(ticker: string) {
    let savedAssetsData: Asset[] = JSON.parse(localStorage.getItem('savedAssetsData')!)
    //FILTRO LA LISTA E RECUPERO L'ASSET RICHIESTO
    return savedAssetsData.filter(asset => asset.ticker === ticker)[0]
  }

  getUltimoPrezzo(ticker: string) {
    return this.getAssetData(ticker).prezzi[0]
  }

  private stessoGiorno(date1: Date, date2: Date) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  }

  calcolaValoreAsset(utente: Utente) {
    let valore = 0
    utente?.assetPosseduti.forEach(asset => {
      let ultimoPrezzo = this.getUltimoPrezzo(asset.asset.ticker)
      valore += asset.quoteAcquistate * (ultimoPrezzo.closePrice ? ultimoPrezzo.closePrice : ultimoPrezzo.openPrice)
    })
    return valore
  }

}
