import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ServerConstants } from "../../shared/constants";

@Injectable()
export class AuthService {

  private _tokenKey: string = "token";

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

  getToken() {
    return JSON.parse(localStorage.getItem(this._tokenKey));
  }

  setToken(token) {
    localStorage.setItem(this._tokenKey, JSON.stringify(token));
  }

  isAuthenticated() {
    let token = localStorage.getItem(this._tokenKey);

    return token ? true : false;
  }

  removeToken() {
    localStorage.removeItem(this._tokenKey);
  }

}
