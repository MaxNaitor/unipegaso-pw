import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Asset } from '../../models/asset';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { Ordine } from '../../models/ordine';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AlphaVantageService } from '../../services/alpha-vantage.service';
import { MarketService } from '../../services/market.service';
import { Price } from '../../models/price';

@Component({
  selector: 'app-mercati',
  imports: [DataViewModule, CommonModule, ButtonModule, ChartModule, DialogModule, FloatLabelModule, FormsModule,InputNumberModule],
  templateUrl: './mercati.component.html',
  styleUrl: './mercati.component.css'
})
export class MercatiComponent implements OnInit {

  availableAssets: Asset[] = []
  assetsLineDatas: Map<string,any> = new Map()

  lineData: any;
  lineOptions: any;

  mostraOrdineDialog: boolean = false
  ordine?: Ordine = new Ordine()

  constructor(private alphaVantageService: AlphaVantageService, private marketService: MarketService) { }

  ngOnInit(): void {
    this.lineOptions = {
      plugins: {
        legend: {
          display: false,
          labels: {
            usePointStyle: true,
          }
        }
      }
    };
    this.marketService.getAvailableAssets().subscribe((res: any) => {
      this.availableAssets = res

      let lineChartLabels: any[] = []

      this.availableAssets.forEach(asset => {
        let assetData = this.alphaVantageService.getAssetData(asset.ticker)
        asset.ultimoPrezzo = Number(assetData.prezzi[0].closePrice ? assetData.prezzi[0].closePrice : assetData.prezzi[0].openPrice)
        let lineChartAssetData: any[] = []
        assetData.prezzi.reverse().forEach((prezzo: Price) => {
          if (lineChartLabels.length < 7) {
            lineChartLabels.push(prezzo.priceDate)
          }
          lineChartAssetData.push(prezzo.closePrice ? prezzo.closePrice : prezzo.openPrice)
        })
        let dataset = {
          label: "Variazione di prezzo dell'ultima settimana",
          data: lineChartAssetData
        }
        let assetLineData = {
          labels: lineChartLabels,
          datasets: [dataset]
        };
        this.assetsLineDatas.set(asset.ticker,assetLineData)
      })
    })
  }

  apriOrdineDialog(asset: Asset,isAcquisto: boolean) {
    this.ordine = new Ordine()
    this.ordine.isAcquisto = isAcquisto
    this.ordine.nomeAsset = asset.nome
    this.ordine.ticker = asset.ticker
    this.ordine.prezzo = asset.ultimoPrezzo!
    this.mostraOrdineDialog = true
  }

  inviaOrdine() {
    this.marketService.eseguiOrdine(this.ordine!).subscribe(res => {
      alert('Ordine eseguito correttamente')
    },err => {
      alert(this.ordine?.isAcquisto ? 'Liquidità non sufficiente' : 'Quote possedute non sufficienti')
    })
    this.mostraOrdineDialog = false
  }

  chiudiDialog() {
    this.mostraOrdineDialog = false
  }

}
