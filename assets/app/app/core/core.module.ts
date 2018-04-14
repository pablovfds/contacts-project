import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing.module";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "./services/auth.guard";
import { AuthService } from "./services/auth.service";
import { AuthInterceptor } from './services/auth.interceptor';

import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "../signup/signup.component";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    CoreRoutingModule
  ],

  declarations: [
    LoginComponent,
    SignUpComponent,
    NotFoundComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    RouterModule
  ]
})
export class CoreModule { }
