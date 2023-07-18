import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product} from '../services/product';
import env from 'config/project_env';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  storageKey: string = "widgetshoppingcart";

  shoppingCart: Array<any>;

  constructor(private http: HttpClient) { }

  updateLocalCart(product: Product) {
    if(window.localStorage.getItem(this.storageKey) === null && product.quantityOrdered > 0) {
      this.shoppingCart = [
       { id: product.id,
        name: product.name,
        quantityOrdered: product.quantityOrdered,
        price: product.price
       }
      ] 
    }
    else {
    this.shoppingCart = this.getLocalShoppingCart();
    let index = this.shoppingCart.indexOf(this.shoppingCart.find(f => {return (f.id == product.id)}))
      if (index >= 0) {
        if(product.quantityOrdered <= 0) {
          this.deleteLocalItem(index)
        }
        else {
          this.shoppingCart[index].quantityOrdered += product.quantityOrdered;
        }
      }
      else {
        this.shoppingCart.push({
          id: product.id,
          name: product.name, 
          quantityOrdered: product.quantityOrdered,
          price: product.price
        });
      }
    } 
    this.saveLocalCart()
  }

  private saveLocalCart() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.shoppingCart))
  }

  searchLocalCart(item: Product): Product {
    let shop: Product[] = JSON.parse(window.localStorage.getItem(this.storageKey));
    let product: Product = shop.find(f => {return f.id == item.id})
    return product;
  }

  deleteLocalItem(index: number) {
    this.shoppingCart.splice(index,1);
  }

  deleteLocalCart() {
    window.localStorage.removeItem(this.storageKey);
  }

  getLocalShoppingCart(): any {
    return JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  getMemberCart(): Observable<any> {
    let url: string = `http://${env.backendServer}/api/cart/cart`;
    return this.http.get(url);
  }

  addMemberCart(product: Product): Observable<any> {
    let url: string = `http://${env.backendServer}/api/cart/additem`;
    return this.http.post(url, {product_id: product.id, quantity_requested: product.quantityOrdered});
  }

  updateMemberCartUpdate(product: any): Observable<any> {
    let url: string = `http://${env.backendServer}/api/cart/update`;
    return this.http.post(url, {product_id: product.id, quantity_requested: product.quantityRequested});
  }

  updateCheckoutCart(product: Product) {
    this.shoppingCart = this.getLocalShoppingCart();
    let index = this.shoppingCart.indexOf(this.shoppingCart.find(f => {return (f.id == product.id)}))
      if (index >= 0) {
        if(product.quantityOrdered <= 0) {
          this.deleteLocalItem(index)
        }
        else {
          this.shoppingCart[index].quantityOrdered = product.quantityOrdered;
        }
      }
    this.saveLocalCart()
  }
  
}
