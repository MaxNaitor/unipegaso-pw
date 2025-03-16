import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarketEnpoints } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  getAvailableAssets() {
    return this.http.get(MarketEnpoints.AVAILABLE_ASSETS)
  }
}
