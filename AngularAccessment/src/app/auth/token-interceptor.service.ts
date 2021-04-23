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

    let token = `eyJhbGciOiJSUzI1NiIsImtpZCI6IkI3QkMyNkZDOEI5MEI0QkExQ0JCNTdDRjQ2OEJBNDBBQkI1ODE1QUQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJ0N3dtX0l1UXRMb2N1MWZQUm91a0NydFlGYTAifQ.eyJuYmYiOjE2MTkxNzAyNjIsImV4cCI6MTYxOTE3Mzg2MiwiaXNzIjoiaHR0cHM6Ly91cHRpbWUyLmd2bmV3c2Rldi5jb20vaWRlbnRpdHkiLCJhdWQiOlsiaHR0cHM6Ly91cHRpbWUyLmd2bmV3c2Rldi5jb20vaWRlbnRpdHkvcmVzb3VyY2VzIiwiUGxhdGZvcm0iXSwiY2xpZW50X2lkIjoiYjRlOGNkZGU2OTNmNDVkNDgwYTIyZjUyNmIxNzRhYzUiLCJzdWIiOiIwY2IxMGZiZDlkYWQ0NDEzYWI1MWNkZmI2ZmU2YzI3NCIsImF1dGhfdGltZSI6MTYxOTE1Mjg5OCwiaWRwIjoibG9jYWwiLCJhY2MiOiJldXJvc3BvcnQiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6WyJvcGVuaWQiLCJwbGF0Zm9ybSJdLCJhbXIiOlsicHdkIl19.OGP2dhhR8HJVSXpMgvLycaUJqQIIux1hqL32RsA10FsNsj2Tg0UkEsid0eoweB96bA2cW2n0gHbhsFpnuRFrABNYVJtMXA2_LJs2AvuAaldcabxctQ0_TM1MAgQslS89YrzEVvHduI2D6PYTdSQFLURT8JkZs7DQqKw8zIuyUkNRKbXF1jVP6zKWHudbpBang6xHkCVujMR5lvQ-cVggbV_e81v_TTHE9-a-YuczSzezYXelVgBL3QGMT1UxUlv8K7wcqo9bBEmEoMqvRKOt1TerhV9TTF1KgJ3ArOyoXXGtZrcLTam9yVDA-43bXQ-JRwIOIG9Z9dcnu8azXrpzzg`;
    request = request.clone({
      setHeaders: {
        // Authorization: `Bearer ${this.auth.getToken()}`
        Authorization: `Bearer ` + token
      }
    });
    return next.handle(request);
  }
}
