import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import env from 'config/project_env';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  submitOrder(): Observable<any> {
    let url = `http://${env.backendServer}/api/cart/submit`;
    return this.http.post(url, {})
  }
}