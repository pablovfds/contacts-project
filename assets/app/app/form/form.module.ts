import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {SignUpComponent} from "@app/form/signup/signup.component";
import {SharedModule} from "@app/shared/shared.module";
import {FormRoutingModule} from "@app/form/form-routing.module";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormRoutingModule
  ],
  declarations: [FormComponent, SignUpComponent, ForgotPasswordComponent, ResetPasswordComponent]
})
export class FormModule { }
