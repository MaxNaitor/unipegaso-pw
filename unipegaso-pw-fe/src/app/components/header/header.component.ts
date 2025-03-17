import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

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
    sessionStorage.removeItem("auth-token")
    window.location.reload()
  }

  mostraTastiNavigazione() {
    return sessionStorage.getItem("auth-token") !== null
  }
}
