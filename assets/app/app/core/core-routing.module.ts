import { NgModule } from '@angular/core';
  import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./services/auth.guard";
import {SignUpComponent} from "../signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: '../admin/admin.module#AdminModule'
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
