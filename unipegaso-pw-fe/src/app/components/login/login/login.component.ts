import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { AuthRequest } from '../../../models/auth-request';
import { UserService } from '../../services/user.service';
import { AuthResponse } from '../../../models/auth-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputTextModule,FormsModule,FloatLabel, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username?: string
  password?: string

  constructor(private userService: UserService, private router: Router){}

  login() {
    let authRequest = new AuthRequest()
    authRequest.username = this.username
    authRequest.password= this.password 
    this.userService.login(authRequest).subscribe(res => {
      let authResponse: AuthResponse = res
      sessionStorage.setItem('auth-token',authResponse.token!)
      this.router.navigate(['il-mio-conto'])
    },err => {
      alert('Credenziali errate')
    })
  }

  registra() {
    let authRequest = new AuthRequest()
    authRequest.username = this.username
    authRequest.password= this.password
    this.userService.registra(authRequest).subscribe(res => {
      let authResponse: AuthResponse = res
      sessionStorage.setItem('auth-token',authResponse.token!)
      this.router.navigate(['il-mio-conto'])
    },err => {
      alert('Username già esistente')
    })
  }
}
