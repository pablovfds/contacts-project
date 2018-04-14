import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this._authService.isAuthenticated() || this._authService.isExpiredToken()) {
      this._authService.revokeSession();
      this.redirectToLoginPage();
      return false;
    } else {
      return true;
    }
  }

  redirectToLoginPage() {
    this._router.navigate(['/login']);
  }
}
