import { Injectable } from '@angular/core';
import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './authservice.service';

export const BYPASS_AUTH = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.auth.getToken();

    if(token && req.context.get(BYPASS_AUTH) === false) {
      const setAuth = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
      });
      return next.handle(setAuth);
    } else {
      return next.handle(req);
    }
  }
 
}
