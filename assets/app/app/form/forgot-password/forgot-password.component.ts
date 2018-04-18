import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BasicValidators} from "@app/shared/basic-validators";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.forgotPasswordForm = this._formBuilder.group({
      'email' : [null, Validators.compose([Validators.required, BasicValidators.email])],
    });
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    console.log(value)
  }

}
