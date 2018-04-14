import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private _authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._authService.getToken();

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}` )
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}