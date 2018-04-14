import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ServerConstants } from "../../shared/constants";
import {User} from "../../shared/models/user";

@Injectable()
export class AuthService {

  private static TOKEN: string = "token";
  private static USER_ID: string = "userId";
  private static EXPIRES_IN:string = "expiresIn";

  constructor(private _http: HttpClient) { }

  login(username: string, password: string) {

    let body = {
      email: username,
      password: password
    };

    return this._http.post(ServerConstants.LOGIN_URL, JSON.stringify(body));
  }

  logout() {
    return this._http.get(ServerConstants.LOGOUT_URL);
  }

  setSession(authData: any) {
    localStorage.setItem(AuthService.TOKEN, JSON.stringify(authData['token']));
    localStorage.setItem(AuthService.USER_ID, authData['user']['id']);
    localStorage.setItem(AuthService.EXPIRES_IN, JSON.stringify(authData['expire_at']))
  }

  getToken() {
    return JSON.parse(localStorage.getItem(AuthService.TOKEN));
  }

  isAuthenticated() {
    let token = localStorage.getItem(AuthService.TOKEN);

    return token ? true : false;
  }

  getUserId() {
    return localStorage.getItem(AuthService.USER_ID);
  }

  isExpiredToken() {
    let expiresIn = JSON.parse(localStorage.getItem(AuthService.EXPIRES_IN));

    return expiresIn && Date.now() > expiresIn;
  }

  revokeSession() {
    localStorage.removeItem(AuthService.TOKEN);
    localStorage.removeItem(AuthService.USER_ID);
    localStorage.removeItem(AuthService.EXPIRES_IN);
  }

}
