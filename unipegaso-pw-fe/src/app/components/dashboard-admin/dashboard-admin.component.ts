import { Component, OnInit } from '@angular/core';
import { Utente as Utente } from '../../models/utente';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AlphaVantageService } from '../../services/alpha-vantage.service';
import { AdminService } from '../../services/admin.service';
import { AssetPieChartComponent } from '../asset-pie-chart/asset-pie-chart.component';
import { StoricoTransazioniComponent } from "../storico-transazioni/storico-transazioni.component";

@Component({
  selector: 'app-dashboard-admin',
  imports: [DialogModule, CommonModule, ButtonModule, ChartModule, TableModule, AssetPieChartComponent, StoricoTransazioniComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {

  utenti: Utente[] = []
  utenteSelezionato?: Utente

  mostraUtenteDialog: boolean = false

  constructor(private adminService: AdminService, public alphaVantageService: AlphaVantageService) {}

  ngOnInit(): void {
    this.adminService.getUtenti().subscribe((res: any) => {
      this.utenti = res
    })
  }

  getAssetPossedutiUtente(utente: Utente) {
    let nomiAsset = utente.assetPosseduti.map(asset => asset.asset.nome)
    if (nomiAsset.length > 0) {
      return nomiAsset.join(', ')
    }
    return 'Nessun Asset posseduto';
  }
  
  mostraDettagliUtente() {
    this.mostraUtenteDialog = true
  }

}
