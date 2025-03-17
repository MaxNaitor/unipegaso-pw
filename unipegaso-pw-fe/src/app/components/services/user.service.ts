import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserEndpoints } from '../../constants/constants';
import { AuthRequest } from '../../models/auth-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(req: AuthRequest) {
    return this.http.post(UserEndpoints.LOGIN,req)
  }

  getUser() {
    return this.http.get(UserEndpoints.GET_USER)
  }
}
