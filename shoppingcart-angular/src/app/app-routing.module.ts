import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: '', 						component: ProductListComponent },
  { path: 'products', 						component: ProductListComponent },
  { path: 'login', 						component: LoginComponent },
  { path: 'customer/cart', 						component: ShoppingcartComponent },
  { path: 'register', 						component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


