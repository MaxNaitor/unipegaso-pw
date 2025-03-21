import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { AuthRequest } from '../../../models/auth-request';
import { AuthResponse } from '../../../models/auth-response';
import { Router } from '@angular/router';
import { AUTH_TOKEN, TIPO_UTENTE } from '../../../constants/constants';
import { ADMIN_PATH, IL_MIO_CONTO_PATH } from '../../../app.routes';
import { UserService } from '../../../services/user.service';

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
      this.setUserInSessionAndRedirect(authResponse)
    },err => {
      alert('Credenziali errate')
    })
  }

  registra() {
    if (this.validaPassword()) {
      let authRequest = new AuthRequest()
      authRequest.username = this.username
      authRequest.password= this.password
      this.userService.registra(authRequest).subscribe(res => {
        let authResponse: AuthResponse = res
        this.setUserInSessionAndRedirect(authResponse)
      },err => {
        alert('Username già esistente')
      })
    } else {
      alert('La password deve contenere almeno 5 caratteri,di cui almeno un carattere speciale e un numero')
    }
  }

  setUserInSessionAndRedirect(authResponse: AuthResponse) {
    sessionStorage.setItem(AUTH_TOKEN,authResponse.token!)
    sessionStorage.setItem(TIPO_UTENTE,authResponse.tipoUtente!.toString())
    if (authResponse.tipoUtente == 1) {
      this.router.navigate([IL_MIO_CONTO_PATH])
    } else {
      this.router.navigate([ADMIN_PATH])
    }
  }

  validaPassword() {
    if (!this.password) return false;
    //criteri per la password:
    //1. almeno 5 caratteri
    //2. deve contenere almeno un carattere speciale
    //3. deve contenere almeno un numero
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;
    return this.password!.length >= 5 && specialCharRegex.test(this.password!) && numberRegex.test(this.password!)
  }
}
