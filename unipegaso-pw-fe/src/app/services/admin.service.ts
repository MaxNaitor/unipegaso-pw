import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminEndpoints } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUtenti() {
    return this.http.get(AdminEndpoints.GET_UTENTI)
  }
}
