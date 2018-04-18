import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormComponent} from "@app/form/form.component";
import {SignUpComponent} from "@app/form/signup/signup.component";

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
