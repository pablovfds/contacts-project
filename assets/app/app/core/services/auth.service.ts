import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ServerConstants } from "../../shared/constants";

import { User } from "@app/shared/models/user";

import * as moment from "moment";

@Injectable()
export class AuthService {

  private static TOKEN: string = "token";
  private static USER_ID: string = "userId";
  private static EXPIRES_AT: string = "expires_at";

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
    const expiresAt = moment().add(authData['expire_at'], 'second');
    
    localStorage.setItem(AuthService.TOKEN, JSON.stringify(authData['token']));
    localStorage.setItem(AuthService.USER_ID, authData['user']['id']);
    localStorage.setItem(AuthService.EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
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

  isLoggedIn() {
    return !moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem(AuthService.EXPIRES_AT);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  revokeSession() {
    localStorage.removeItem(AuthService.TOKEN);
    localStorage.removeItem(AuthService.USER_ID);
    localStorage.removeItem(AuthService.EXPIRES_AT);
  }
}
