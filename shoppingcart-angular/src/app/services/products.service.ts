import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product} from '../services/product';
import { BYPASS_AUTH } from '../services/authinterceptor.service';
import env from 'config/project_env';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http: HttpClient) { }

  getProductSearch(searchTerm: string): Observable<any> {
    let url: string = `http://${env.backendServer}/api/products?search=${searchTerm}`;
    return this.http.get<Product[]>(url, {context: new HttpContext().set(BYPASS_AUTH, true)});
  }

  getProducts(): Observable<any> {
    let url: string = `http://${env.backendServer}/api/products`;
    console.log(env.backendServer)
    return this.http.get<Product[]>(url, {context: new HttpContext().set(BYPASS_AUTH, true)});
  }

  getProduct(id: string): Observable<any> {
    let url: string = `http://${env.backendServer}/api/products/${id}`;
    return this.http.get<Product>(url, {context: new HttpContext().set(BYPASS_AUTH, true)});
  }


}
