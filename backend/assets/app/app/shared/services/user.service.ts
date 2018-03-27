import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { signUpUrl } from "../../shared/data.service";


@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  signUp(user: User) {
    return this._http.post(signUpUrl, user);
  }

}
