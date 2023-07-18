import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UsermanagementService } from 'src/app/services/usermanagement.service';
import { AuthService } from '../../services/authservice.service'
import { User } from '../../services/user'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  hasSession: boolean;
  authenticatedUser: User;


  constructor(
    private auth:AuthService,
    private user:UsermanagementService,
    private router:Router) { 
      this.auth.checkSession().subscribe(res => {
        this.hasSession = res;
        if(this.hasSession) {
          this.authenticatedUser = this.user.getUser();
        }
      })
  }

  ngOnInit(): void {
    this.auth.checkSession().subscribe(res => {
      this.hasSession = res;
      if(this.hasSession) {
        this.authenticatedUser = this.user.getUser();
      }
    })
  }

  signOff() {
    this.auth.signOff();
    this.ngOnInit();
    this.router.navigateByUrl('');
  }

}
