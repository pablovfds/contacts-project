import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

import { BasicValidators } from '@app/shared/basic-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute) {
      
    this.resetPasswordForm = this._formBuilder.group({
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)])],
      'confirmPassword': [null, Validators.required]
    }, {
        validator: BasicValidators.Match('password', 'confirmPassword')
      });
  }

  ngOnInit() {
  }

  onSubmit(value) {
    let token = this._activatedRoute.snapshot.paramMap.get("id");
    this._userService.resetPassword(token, value.password)
      .subscribe((data) => {
        if (data['code'] == 200) {
          this._toastrService.success(data['message'], "Success!");
          this._router.navigate(['/login']);
        }
      }, (err) => {
        this._toastrService.error(err['err'], 'Error!');
      });
  }
}
