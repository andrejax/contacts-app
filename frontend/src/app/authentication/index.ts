
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { AuthorizationInterceptor } from './authentication.interceptor';
import { AuthenticationGuard } from './authentication.guard';

@NgModule({
    providers: [
        AuthenticationService,
        AuthenticationGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationInterceptor,
            multi: true
        },
    ]
})


class AuthenticationModule { }
export {
    AuthenticationModule,
    AuthenticationGuard,
    AuthenticationService,
    AuthorizationInterceptor
};
  