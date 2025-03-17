import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UserService } from '../services/user.service';
import { User } from '../../models/user';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { COLORS } from '../../constants/constants';
import { AlphaVantageService } from '../services/alpha-vantage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-il-mio-conto',
  imports: [ChartModule, ButtonModule, CommonModule],
  templateUrl: './il-mio-conto.component.html',
  styleUrl: './il-mio-conto.component.css'
})
export class IlMioContoComponent implements OnInit {

  constructor(private userService: UserService, private alphaVantageService: AlphaVantageService, private router: Router) { }

  utenteLoggato?: User

  pieData: any;
  pieOptions: any;

  lineData: any;
  lineOptions: any;

  ngOnInit(): void {
    this.initChart()
    this.userService.getUser().subscribe(res => {
      this.utenteLoggato = res as User

      let pieChartLabels: any[] = []
      let pieChartData: any[] = []

      //COSTRUISCO IL GRAFICO A PARTIRE DAGLI ASSET POSSEDUTI DALL'UTENTE
      this.utenteLoggato.assetPosseduti.forEach(assetUtente => {
        let ultimoPrezzo = this.alphaVantageService.getUltimoPrezzo(assetUtente.asset.ticker)
        pieChartLabels.push(assetUtente.asset.nome)
        pieChartData.push(assetUtente.quoteAcquistate * (ultimoPrezzo.closePrice ? ultimoPrezzo.closePrice : ultimoPrezzo.openPrice))
      })

      this.pieData = {
        labels: pieChartLabels,
        datasets: [
          {
            data: pieChartData,
            backgroundColor: COLORS.slice(0, pieChartLabels.length),
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
    })
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.lineData = {
      labels: ['7', '6', '5', '4', '3', '2', '1'],
      datasets: [
        {
          data: [505, 520, 530, 305, 405, 450],
          backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')],
          tension: 0.4,
        }
      ]
    };

    this.lineOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      },
      scales: {
        y: {
          suggestedMin: 0
        }
      }
    };
  }

  naviga(path: string) {
    this.router.navigate([path])
  }

  calcolaValorePortafogli() {
    let valore = 0
    this.utenteLoggato?.assetPosseduti.forEach(asset => {
      let ultimoPrezzo = this.alphaVantageService.getUltimoPrezzo(asset.asset.ticker)
      valore += asset.quoteAcquistate * (ultimoPrezzo.closePrice ? ultimoPrezzo.closePrice : ultimoPrezzo.openPrice)
    })
    return valore
  }
}
