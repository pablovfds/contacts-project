import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

import { BasicValidators } from '@app/shared/basic-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private _userService: UserService,
              private _toastrService: ToastrService,
              private _router: Router,
              private _formBuilder: FormBuilder) {
    this.signUpForm = this._formBuilder.group({
      'email' : [null, Validators.compose([Validators.required, BasicValidators.email])],
      'name' : [null, Validators.compose([
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')])],
      'phone' : [null, Validators.compose([
        Validators.required,
        Validators.pattern('\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}')])],
      'password' : [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)])],
      'confirmPassword' : [null, Validators.required]
    }, {
      validator: BasicValidators.Match('password', 'confirmPassword')
    });
  }

  ngOnInit() {
  }

  registerAccount(value) {
    this._userService.signUp(value).subscribe(
      data => {
        if (data['code'] == 201) {
          this._toastrService.success(data['message'], 'Success!');
          this._router.navigate(['/login']);
        }
      }, error => {
        console.error(error)
      }
    );
  }
}
