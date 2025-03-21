import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Utente } from '../../models/utente';
import { COLORS } from '../../constants/constants';
import { AlphaVantageService } from '../../services/alpha-vantage.service';

@Component({
  selector: 'app-asset-pie-chart',
  imports: [ChartModule],
  templateUrl: './asset-pie-chart.component.html',
  styleUrl: './asset-pie-chart.component.css'
})
export class AssetPieChartComponent implements OnChanges {

  @Input()
  utente?: Utente

  pieData: any;
  pieOptions: any;

  constructor(private alphaVantageService: AlphaVantageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.utente = changes['utente'].currentValue
    //COSTRUISCO IL GRAFICO A PARTIRE DAGLI ASSET POSSEDUTI DALL'UTENTE
    let pieChartLabels: any[] = []
    let pieChartData: any[] = []

    this.utente?.assetPosseduti.forEach(assetUtente => {
      let ultimoPrezzo = this.alphaVantageService.getUltimoPrezzo(assetUtente.asset.ticker)
      pieChartLabels.push(assetUtente.asset.nome)
      pieChartData.push(assetUtente.quoteAcquistate * (ultimoPrezzo.closePrice ? ultimoPrezzo.closePrice : ultimoPrezzo.openPrice))
    })

    let backgroundColor = COLORS.slice(0, pieChartLabels.length)

    if (pieChartLabels.length < 1) {
      pieChartLabels = ['Nessun Asset']
    }

    if (pieChartData.length < 1) {
      pieChartData = [1]
      backgroundColor = ['grey']
    }

    this.pieData = {
      labels: pieChartLabels,
      datasets: [
        {
          data: pieChartData,
          backgroundColor:backgroundColor
        }
      ]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          }
        }
      }
    };
  }


}
