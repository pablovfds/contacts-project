import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {AuthService} from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _authService: AuthService,
              private _toastr: ToastrService,
              private _router: Router,
              private _fb: FormBuilder) {
    this.loginForm = _fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {

  }

  public onSubmitLogin(value) {
     this._authService.login(value.email, value.password)
       .subscribe(
         data => {
           if (data && data.token) {
             this._authService.setToken(data.token);
             this._toastr.success(data.message, 'Success!');
             this._router.navigate(['/home']);
           }
       }, error => {
         this._toastr.error(error.error.message, 'Error!');
       }
     )
  }

}
