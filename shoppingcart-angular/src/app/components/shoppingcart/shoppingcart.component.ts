import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service'
import { Product} from '../../services/product'
import { ShoppingcartService } from '../../services/shoppingcart.service'
import { AuthService } from '../../services/authservice.service'
import { OrdersService } from '../../services/orders.service'

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  cart: Product[];
  hasSession: boolean;
  cartID: string;
  orderID: string;

  constructor(
    private productsService: ProductsService, 
    private shoppingCart: ShoppingcartService,
    private auth: AuthService,
    private orders: OrdersService
  ) { 
    this.auth.checkSession().subscribe(res => {this.hasSession = res})
  }

  ngOnInit(): void {
   this.auth.checkSession().subscribe(res => {this.hasSession = res})
    if(this.hasSession) {
      this.getMemberCart();
    }
    else {
      this.cart = this.shoppingCart.getLocalShoppingCart();
      this.cart.forEach((product) => {
        product.quantityRequested = product.quantityOrdered;
        })
    }
  }

  getMemberCart() {
    this.shoppingCart.getMemberCart()
    .subscribe(results => {
      this.cart = results.items;
      this.cartID = results.cartID;
      this.cart.forEach((product) => {
      product.quantityRequested = product.quantityOrdered;
      })
    })
  }

  checkProduct(product: Product) {
    let quantity: number;
    product.message = "";
    delete product.message;
    this.productsService.getProduct(product.id)
    .subscribe(results => {
      quantity = results[0].quantity
      let quantityDiff: number = product.quantityRequested - product.quantityOrdered;
      if(quantityDiff > quantity) {
        product.message = "Not enough items in stock";
      } else {
        if(this.hasSession) {
          this.shoppingCart.updateMemberCartUpdate(product)
          .subscribe(results => {
            this.getMemberCart();
          })  
        } 
        else {
          product.quantityOrdered = product.quantityRequested;
          this.shoppingCart.updateCheckoutCart(product);
        }
      }
    });
  }

  private assignQuantityRequested(product: Product) {
    this.cart.forEach((product) => {
      product.quantityRequested = product.quantityOrdered;
      })
  }

  
  cartTotal() {
    let total = 0;
    for(let cart of this.cart) {
      total += cart.quantityRequested * cart.price
    }
    return total;
  }

  submit() {
    this.orders.submitOrder()
    .subscribe(result => {
      this.orderID = result.orderID; 
      this.cart = null;
      this.cartID = null;
    }
      )
  }

}
