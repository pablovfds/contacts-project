import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _auth: AuthService,
              private _toastr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let token = this._auth.getToken();

    if (!token) {
      this._toastr.error("User is not authenticated.");
      this.redirectToLoginPage();
      return false;
    } else if (this._auth.isAuthenticated()) {
      return true;
    }
  }

  redirectToLoginPage() {
    this._router.navigate(['/login']);
  }
}
