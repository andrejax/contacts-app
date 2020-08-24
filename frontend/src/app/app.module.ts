import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AuthenticationModule, AuthenticationGuard } from './authentication';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path: 'accounts',
        loadChildren: () => import('./accounts').then((m) => m.AccountsModule),
      },
      {
        path: 'contacts',
        loadChildren: () => import('./contacts').then((m) => m.ContactsModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: '',
        redirectTo: '/contacts',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/contacts'
      }])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
