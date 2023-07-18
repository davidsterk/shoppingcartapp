import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service'
import { Product} from '../../services/product'
import { ShoppingcartService } from '../../services/shoppingcart.service'
import { AuthService } from '../../services/authservice.service'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchTerm: string;
  products: Product[];
  hasSession: boolean;

  constructor(
    private productsService: ProductsService, 
    private shoppingCart: ShoppingcartService,
    private auth: AuthService
    ) {
      this.auth.checkSession().subscribe(res => {this.hasSession = res})
    }

  ngOnInit(): void {
    this.getProducts();
    
  }

  productSearch() {
    if(this.searchTerm && this.searchTerm.trim() != "") {
      this.productsService
      .getProductSearch(this.searchTerm)
      .subscribe(results => {
        this.products = results;
        this.addItemCount();
        this.checkCart();
      });
    } else {
      this.getProducts();
    }
  }


  getProducts() {
    this.productsService
    .getProducts()
    .subscribe(results => {
      this.products = results;
      this.addItemCount();
      this.checkCart();
    });
  }


addItemCount() {
  this.products.forEach(element => {
    element.quantityOrdered = 1;
    element.message = "";
  });
}

updateCart(product: Product) {
  if(!this.hasSession) { 
    if(product.quantityOrdered >= 0) {
      this.shoppingCart.updateLocalCart(product);
      product.quantity = product.quantity - product.quantityOrdered;
      this.productSearch();
    }
  }
  else {
    this.shoppingCart
    .addMemberCart(product)
    .subscribe(results => {
      this.productSearch();
    })
  }
  product.message = "Item Added to Cart"
}

  checkCart() {
  if(!this.hasSession) { 
    let cart: Array<any> = this.shoppingCart.getLocalShoppingCart();
    if(cart) {
      cart.forEach(element => {
        let product: Product = this.products.find(f => {return (f.id == element.id)})
        if(product) {
          product.quantity = product.quantity - element.quantityOrdered;
        }
        });
      }
    }
  }
}
