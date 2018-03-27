import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {Auth} from "../../shared/models/auth";
import {loginUrl} from "../../shared/data.service";

@Injectable()
export class AuthService {

  tokenKey: string = "token";

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    let body = {
      email: username,
      password: password
    };

    return this.http.post<Auth>(loginUrl, JSON.stringify(body));
  }

  getToken() {
    return JSON.parse(localStorage.getItem(this.tokenKey));
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  isAuthenticated() {
    let token = localStorage.getItem(this.tokenKey);

    if (token) {
      return true;
    }
    else {
      return false;
    }
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

}
