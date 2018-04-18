import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./services/auth.guard";
import {LoginComponent} from "./login/login.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: '@app/admin/admin.module#AdminModule'
  },
  {
    path: 'form',
    loadChildren: '@app/form/form.module#FormModule'
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
