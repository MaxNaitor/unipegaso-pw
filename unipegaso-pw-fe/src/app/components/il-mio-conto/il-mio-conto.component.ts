import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UserService } from '../services/user.service';
import { User } from '../../models/user';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { COLORS, USERNAME_UTENTE } from '../../constants/constants';
import { AlphaVantageService } from '../services/alpha-vantage.service';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-il-mio-conto',
  imports: [ChartModule, ButtonModule, CommonModule, DialogModule, FloatLabel, InputNumberModule, FormsModule],
  templateUrl: './il-mio-conto.component.html',
  styleUrl: './il-mio-conto.component.css'
})
export class IlMioContoComponent implements OnInit {

  constructor(private userService: UserService, private alphaVantageService: AlphaVantageService, private router: Router) { }

  utenteLoggato?: User

  pieData: any;
  pieOptions: any;

  versamentoPrelievoModalShow: boolean = false
  isVersamento: boolean = true
  importoMovimento: number = 0;

  ngOnInit(): void {
    this.userService.getUser().subscribe(res => {
      this.utenteLoggato = res as User
      sessionStorage.setItem(USERNAME_UTENTE,this.utenteLoggato.username)

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

  openVersamentoPrelievoDialog(isVersamento: boolean) {
    this.versamentoPrelievoModalShow = true
    this.isVersamento = isVersamento
  }

  closeVersamentoPrelievoDialog() {
    this.versamentoPrelievoModalShow = false
    this.importoMovimento = 0
  }

  versaPreleva() {
    let importo = this.isVersamento ? this.importoMovimento : -(this.importoMovimento)
    this.userService.versaPreleva(importo).subscribe({
      next: (res) => {
        this.utenteLoggato!.liquidita = res as number
        alert(this.isVersamento ? 'Versamento andato a buon fine' : 'Prelievo andato a buon fine')
        this.closeVersamentoPrelievoDialog()
      },
      error: err => {
        alert('Liquidità non sufficiente per il prelievo')
        this.closeVersamentoPrelievoDialog()
      }
    })
  }
}
