import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';
import { Response } from '../models/response';
import { ServerConstants } from "../constants";

import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class UserService {

  constructor(private _http: HttpClient,
              private _authService: AuthService) { }

  signUp(user: any) {

    let body: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      photo: ""
    };

    return this._http.post<Response>(ServerConstants.SIGN_UP_URL, body);
  }

  getUserById(userId: any) {
    return this._http.get(ServerConstants.USER_URL + '/' + userId, {
      headers: this._createAuthHeaders()
    })
  }


  private _createAuthHeaders() {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this._authService.getToken() });
  }

}
