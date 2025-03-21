import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Utente } from '../../models/utente';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { USERNAME_UTENTE } from '../../constants/constants';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { AssetPieChartComponent } from "../asset-pie-chart/asset-pie-chart.component";
import { AlphaVantageService } from '../../services/alpha-vantage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-il-mio-conto',
  imports: [ChartModule, ButtonModule, CommonModule, DialogModule, FloatLabel, InputNumberModule, FormsModule, AssetPieChartComponent],
  templateUrl: './il-mio-conto.component.html',
  styleUrl: './il-mio-conto.component.css'
})
export class IlMioContoComponent implements OnInit {

  constructor(private userService: UserService, private alphaVantageService: AlphaVantageService, private router: Router) { }

  utenteLoggato?: Utente

  pieData: any;
  pieOptions: any;

  versamentoPrelievoModalShow: boolean = false
  isVersamento: boolean = true
  importoMovimento: number = 0;

  valoreAsset: number = 0

  ngOnInit(): void {
    this.userService.getUser().subscribe(res => {
      this.utenteLoggato = res as Utente
      sessionStorage.setItem(USERNAME_UTENTE,this.utenteLoggato.username)
      this.valoreAsset = this.alphaVantageService.calcolaValoreAsset(this.utenteLoggato!)
    })
  }

  naviga(path: string) {
    this.router.navigate([path])
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
