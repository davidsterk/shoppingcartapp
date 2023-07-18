import { Injectable } from '@angular/core';
import { User } from '../services/user'

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  sessionUser: string = 'shoppingcart_user'
  constructor() { }

  setUser(data: any) {
    let user: User = new User();
    user.id = data.user_id;
    user.firstName = data.firstname,
    user.lastName = data.lastname;
    window.sessionStorage.setItem(this.sessionUser, JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(window.sessionStorage.getItem(this.sessionUser));
  }

  removeUser() {
    window.sessionStorage.removeItem(this.sessionUser);
  }



}
