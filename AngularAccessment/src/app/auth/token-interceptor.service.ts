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

    let token = `eyJhbGciOiJSUzI1NiIsImtpZCI6IkI3QkMyNkZDOEI5MEI0QkExQ0JCNTdDRjQ2OEJBNDBBQkI1ODE1QUQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJ0N3dtX0l1UXRMb2N1MWZQUm91a0NydFlGYTAifQ.eyJuYmYiOjE2MTkxNTI5MDAsImV4cCI6MTYxOTE1NjUwMCwiaXNzIjoiaHR0cHM6Ly91cHRpbWUyLmd2bmV3c2Rldi5jb20vaWRlbnRpdHkiLCJhdWQiOlsiaHR0cHM6Ly91cHRpbWUyLmd2bmV3c2Rldi5jb20vaWRlbnRpdHkvcmVzb3VyY2VzIiwiUGxhdGZvcm0iXSwiY2xpZW50X2lkIjoiYjRlOGNkZGU2OTNmNDVkNDgwYTIyZjUyNmIxNzRhYzUiLCJzdWIiOiIwY2IxMGZiZDlkYWQ0NDEzYWI1MWNkZmI2ZmU2YzI3NCIsImF1dGhfdGltZSI6MTYxOTE1Mjg5OCwiaWRwIjoibG9jYWwiLCJhY2MiOiJldXJvc3BvcnQiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6WyJvcGVuaWQiLCJwbGF0Zm9ybSJdLCJhbXIiOlsicHdkIl19.PuvRz8G7SgW5lTnRa2oD6FNoAZVLuHxw0_W3VlB_iuRIBe0RDxANFXKFS7MHE0QlNFpM4xtSXo0_sRcnUH-t5UgqBSiaQuwN78HOMbL9lRKZhysLigRWm43GwlCRinCKChqwfRRyzrxaFatEz_QMt8r0pbQYhkT-4QIsmgFvCESOuD1Oi43XgSQWbVRlf0lTJQ-IUwvI5fCkiufl8VQlRtzchh-SAL1XDSjTbpR7VkEaYxjfljn6C6G80OZ3ba065lLIGELj3MBe7BZV-6xDmb0SH5Xcb_jOx6_qm-w6yi6yb3uctGtXHiRcdyGwq0TNEeIMPOhzgojVPmFZs_4A6A`;
    request = request.clone({
      setHeaders: {
        // Authorization: `Bearer ${this.auth.getToken()}`
        Authorization: `Bearer ` + token
      }
    });
    return next.handle(request);
  }
}
