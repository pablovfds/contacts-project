import { NgModule } from '@angular/core';
  import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./services/auth.guard";
import {HomeComponent} from "../home/home.component";
import {SignupComponent} from "../signup/signup.component";
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
