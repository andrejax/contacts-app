import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(private readonly router: Router, private readonly auth: AuthenticationService) { }

    canActivate(): boolean {
        if (this.auth.token) {
            return true;
        }
    
        this.router.navigate(['/accounts/login']);

        return false;
    }
}
