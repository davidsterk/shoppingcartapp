import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  submitOrder(): Observable<any> {
    let url = 'http://localhost:3000/api/cart/submit';
    return this.http.post(url, {})
  }
}