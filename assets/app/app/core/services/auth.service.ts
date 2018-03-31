import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {Auth} from "../../shared/models/auth";
import {ServerConstants} from "../../shared/constants";

@Injectable()
export class AuthService {

  tokenKey: string = "token";

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    let body = {
      email: username,
      password: password
    };

    return this.http.post<Auth>(ServerConstants.LOGIN_URL, JSON.stringify(body));
  }

  logout() {
    return this.http.get(ServerConstants.LOGOUT_URL);
  }

  getToken() {
    return JSON.parse(localStorage.getItem(this.tokenKey));
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  isAuthenticated() {
    let token = localStorage.getItem(this.tokenKey);

    return !!token;
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

}
