import { Component, OnInit } from '@angular/core';
import { AlphaVantageService } from '../services/alpha-vantage.service';
import { DataViewModule } from 'primeng/dataview';
import { MarketService } from '../services/market.service';
import { Asset } from '../../models/asset';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mercati',
  imports: [DataViewModule, CommonModule, ButtonModule, ChartModule],
  templateUrl: './mercati.component.html',
  styleUrl: './mercati.component.css'
})
export class MercatiComponent implements OnInit {

  availableAssets: Asset[] = []
  assetsLineDatas: Map<string,any> = new Map()

  lineData: any;
  lineOptions: any;

  constructor(private alphaVantageService: AlphaVantageService, private marketService: MarketService, private userService: UserService) { }

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
        assetData.prezzi.reverse().forEach(prezzo => {
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

}
