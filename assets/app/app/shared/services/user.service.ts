import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '@app/shared/models/user';

import { environment } from '@env/environment';

@Injectable()
export class UserService {

  apiUrl: string;
  apiWithUserUrl: string;

  constructor(private _http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
    this.apiWithUserUrl = `${this.apiUrl}/user`;
  }

  signUp(user: any) {

    let body: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      photo: ""
    };

    return this._http.post(`${this.apiUrl}/sign-up`, body);
  }

  getUserById(userId: any) {
    return this._http.get(`${this.apiWithUserUrl}/${userId}`)
  }

  forgotPassword(email: string) {

    let body = {
      email: email
    }

    return this._http.post(`${this.apiWithUserUrl}/forgot`, body)
  }
}
