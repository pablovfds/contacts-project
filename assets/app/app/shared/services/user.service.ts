import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Response } from '../models/response';
import { ServerConstants } from "../constants";

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  signUp(user: any) {

    let body: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone
    };

    return this._http.post<Response>(ServerConstants.SIGN_UP_URL, body);
  }

}
