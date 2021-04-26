import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any > , next: HttpHandler): Observable<HttpEvent < any >> {

    let token = sessionStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        // Authorization: `Bearer ${this.auth.getToken()}`
        Authorization: `Bearer ` + token
      }
    });
    return next.handle(request);
  }

  setToken(token: string){}

  getToken(){}
}
