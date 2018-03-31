import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";

import {AuthGuard} from "./services/auth.guard";
import {AuthService} from "./services/auth.service";
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../shared/shared.module";
import {CoreRoutingModule} from "./core-routing.module";
import {HomeComponent} from "../home/home.component";
import {SignUpComponent} from "../signup/signup.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    CoreRoutingModule
  ],

  declarations: [
    LoginComponent,
    HomeComponent,
    SignUpComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  exports: [
    RouterModule
  ]
})
export class CoreModule { }
