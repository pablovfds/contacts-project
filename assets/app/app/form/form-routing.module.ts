import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormComponent} from "@app/form/form.component";
import {SignUpComponent} from "@app/form/signup/signup.component";
import {ForgotPasswordComponent} from "@app/form/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from '@app/form/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: FormComponent,
    children: [
      { path: '', component: SignUpComponent }
    ]
  },
  {
    path: 'forgot-password',
    component: FormComponent,
    children: [
      { path: '', component: ForgotPasswordComponent }
    ]
  },
  {
    path: 'reset-password',
    component: FormComponent,
    children: [
      { path: ':id', component: ResetPasswordComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
