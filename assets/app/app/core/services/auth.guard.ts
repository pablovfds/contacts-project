import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let token = this._auth.getToken();

    if (!token) {
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
