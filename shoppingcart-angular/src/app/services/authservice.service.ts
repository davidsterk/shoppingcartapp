import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { UsermanagementService } from './usermanagement.service';
import { BYPASS_AUTH } from './authinterceptor.service';
import env from 'config/project_env';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionToken: string = 'shoppingcart_token';

  private hasSession: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private user: UsermanagementService) {}
 
  checkSession(): Observable<boolean> {
    if(window.sessionStorage.getItem(this.sessionToken)) {
      this.hasSession.next(true)
    }
    else { this.hasSession.next(false)}
    return this.hasSession.asObservable()
  }

  loginUser(email: string, password: string): Observable<any> {
    let url = `http://${env.backendServer}/api/user/signin`;
    return this.http.post(url, {email: email, password: password},{context: new HttpContext().set(BYPASS_AUTH, true)}).pipe(
      tap((res: any) => {
          this.storeSession(res);
      })
    );
  }

  getToken(): any {
    return window.sessionStorage.getItem(this.sessionToken);
  }

  private storeSession(data: any) {
    window.sessionStorage.setItem(this.sessionToken, data.accessToken);
    this.user.setUser(data);
  }

  signOff() {
    this.user.removeUser();
    window.sessionStorage.removeItem(this.sessionToken);
  }

  register(form: any): Observable<any> {
    let url = `http://${env.backendServer}/api/user/signup`;
    return this.http.post(url, {email: form.email, password: form.password, firstname: form.firstName, lastname: form.lastName},{context: new HttpContext().set(BYPASS_AUTH, true)})
  }
}
