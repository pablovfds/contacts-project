import { Component, OnInit } from '@angular/core';

import {AuthService} from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private _authService: AuthService,
              private _toastr: ToastrService,
              private _router: Router) { }

  ngOnInit() {

  }

  public onSubmitLogin() {
     this._authService.login(this.email, this.password)
       .subscribe(
       data => {
         if (data && data.token) {
           localStorage.setItem('token', data.token);
           this._toastr.success(data.message, 'Success!');
           this._router.navigate(['/home']);
         }
       }
     )
  }

}
