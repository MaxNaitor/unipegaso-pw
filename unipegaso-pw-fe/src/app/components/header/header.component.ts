import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AUTH_TOKEN, TIPO_UTENTE, USERNAME_UTENTE } from '../../constants/constants';
import { IL_MIO_CONTO_PATH, IMPARA_PATH, MERCATI_PATH, TRANSAZIONI_PATH } from '../../app.routes';

@Component({
  selector: 'app-header',
  imports: [ButtonModule,ToolbarModule,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  MERCATI_PATH = MERCATI_PATH
  IL_MIO_CONTO_PATH = IL_MIO_CONTO_PATH
  TRANSAZIONI_PATH = TRANSAZIONI_PATH
  IMPARA_PATH = IMPARA_PATH

  constructor(private router: Router) {}

  naviga(path: string) {
    this.router.navigate([path])
  }

  logout() {
    sessionStorage.removeItem(AUTH_TOKEN)
    sessionStorage.removeItem(USERNAME_UTENTE)
    window.location.reload()
  }

  mostraTastiNavigazione() {
    return sessionStorage.getItem(AUTH_TOKEN) !== null && sessionStorage.getItem(TIPO_UTENTE) !== null && sessionStorage.getItem(TIPO_UTENTE) == '1'
  }

  mostraLogout() {
    return sessionStorage.getItem(AUTH_TOKEN) !== null
  }
}
