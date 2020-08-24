import { Component } from '@angular/core';
import { Router, } from '@angular/router';

import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private readonly accountsService: AuthenticationService, private readonly router: Router) { }

  showNavigation() {
    return !!this.accountsService.token;
  }
  
  logout() {
    this.accountsService.logout();
    this.router.navigate(['/accounts/login'], { replaceUrl: true });
  }
}
