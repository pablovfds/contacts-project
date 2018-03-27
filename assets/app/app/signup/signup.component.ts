import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  confirmPassword: string;

  constructor(private _userService: UserService,
              private _toastr: ToastrService,
              private _router: Router,
              private _fb: FormBuilder) {
    this.signUpForm = this._fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(100)])],
      'confirmPassword' : [null, Validators.required],
      'name' : [null, Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')])],
      'phone' : [null, Validators.compose([Validators.required, Validators.pattern('\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}')])]
    }, this.passwordMatchValidator);
  }

  ngOnInit() {
  }

  registerAccount(value) {
    console.log(value)
    // this._userService.signUp().subscribe(
    //   data => {
    //
    //   }, error => {
    //
    //   }
    // );
  }

  passwordMatchValidator(g: FormGroup) {
     return g.get('password').value === g.get('passwordConfirm').value
        ? null : {'mismatch': true};
  }

}
