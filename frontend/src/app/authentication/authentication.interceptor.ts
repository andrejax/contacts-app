import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
@Injectable({
    providedIn: 'root'
})
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(private readonly service: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request) {
            if (this.service.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.service.token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        }
        return next.handle(request);
    }
}
