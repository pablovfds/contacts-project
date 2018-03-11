import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {loginUrl} from "../data.service";
import {Auth} from "../models/auth";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    let body = {
      email: username,
      password: password
    };

    return this.http.post<Auth>(loginUrl, JSON.stringify(body));
  }

}
