import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AUTH_TOKEN, USERNAME_UTENTE } from '../../constants/constants';

@Component({
  selector: 'app-header',
  imports: [ButtonModule,ToolbarModule,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

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
    return sessionStorage.getItem(AUTH_TOKEN) !== null
  }
}
