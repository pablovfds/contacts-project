import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ServerConstants } from "../../shared/constants";
import {User} from "../../shared/models/user";

@Injectable()
export class AuthService {

  private _tokenKey: string = "token";
  private _userId: string = "userId";

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

  setUserId(userId: string) {
    localStorage.setItem(this._userId, userId);
  }

  getUserId() {
    return localStorage.getItem(this._userId);
  }

}
