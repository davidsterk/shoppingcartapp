import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../services/product'
import { AuthService } from '../../services/authservice.service'
import { ShoppingcartService } from '../../services/shoppingcart.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cart: Product[];
  email: string;
  password: string;
  message: string;
  constructor(
    private auth: AuthService,
    private route: Router,
    private shoppingCart: ShoppingcartService,
    ) { }

  ngOnInit(): void {
  }

  checkLogin() {
    this.auth.loginUser(this.email, this.password)
    .subscribe(
      (res) => {
        this.insertShoppingCart();
        this.route.navigateByUrl('')
      },
      (err) => {
        this.message = "Login Failed"

    });
  }

  insertShoppingCart() {
    this.cart = this.shoppingCart.getLocalShoppingCart();
    if(this.cart) {
      this.cart.forEach(element => {
        this.shoppingCart.addMemberCart(element)
        .subscribe(results => {});
      })
    }
    this.shoppingCart.deleteLocalCart();
  }
  

}
