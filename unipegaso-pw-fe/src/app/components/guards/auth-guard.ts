import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AUTH_TOKEN } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = sessionStorage.getItem(AUTH_TOKEN); 

    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
