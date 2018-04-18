import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasicValidators } from "@app/shared/basic-validators";

import { UserService } from '@app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  message: string = "";

  constructor(private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _toastrService: ToastrService) {
    this.forgotPasswordForm = this._formBuilder.group({
      'email': [null, Validators.compose([Validators.required, BasicValidators.email])],
    });
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this._userService.forgotPassword(value.email)
      .subscribe((data) => {
        this._toastrService.success("Success!")
        this.message = data['message'];
      }, (err) => {
        this._toastrService.error(err['error']['err'])
      });
  }

}
