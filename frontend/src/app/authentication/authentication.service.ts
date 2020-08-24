import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public token: string = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.api}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.api}/login`, { username, password })
      .pipe( 
        tap((data) => {
          this.set(data.token);
        }));
  }

  logout(): void {
    this.set(null);
  }

  set(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    this.token = token;
  }
}
