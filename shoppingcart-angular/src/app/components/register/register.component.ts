import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  static REGEX_PATTERN=RegExp("^[a-zA-Z]*$");
  static REGEX_EMAIL=RegExp("^[a-zA-Z0-9._-]+[@][a-zA-Z0-9]+[.][a-zA-Z0-9]{1,63}$");

  message: String
  emailMessage: String;
  passwordMessage: String;
  verifyPasswordMessage: String;
  firstNameMessage: String;
  lastNameMessage: string;
  form: any = {
    email: null,
    password: null,
    verifyPassword: null,
    firstName: null,
    lastName: null,
    address: {
      street: null,
      city: null,
      state: null,
      zip: null
    }
  };

  constructor(
    private auth: AuthService,
    private route: Router) { }

  ngOnInit(): void {
  }

  validateInputs(): boolean {
    let isValid = true;
    this.resetMessages();
    if(!this.form.email || !RegisterComponent.REGEX_EMAIL.test(this.form.email)) {
      this.emailMessage = "Not a valid email";
      isValid = false;

    }
    if(!this.form.password || this.form.password.lengh < 6) {
      this.passwordMessage = "Invalid Password";
      isValid = false;

    } else if(!this.form.verifyPassword || this.form.password != this.form.verifyPassword) {
      this.verifyPasswordMessage = "Password Does not match";
      isValid = false;

    } if(!this.form.firstName || !RegisterComponent.REGEX_PATTERN.test(this.form.firstName) || this.form.firstName.length < 2) {
      this.firstNameMessage = "Invalid First Name";
      isValid = false;

    }
    if(!this.form.lastName || !RegisterComponent.REGEX_PATTERN.test(this.form.lastName) || this.form.lastName.length < 2) {
      this.lastNameMessage = "Invalid Last Name";
      isValid = false;
    }
    return isValid
  }

  submit() {
    if(this.validateInputs()) {
      this.auth.register(this.form).subscribe(
        res => {
          this.route.navigateByUrl('/login');
          },
        err => {
          this.message = "Unable to Register. Verify inputs";
        } 
      )
    }
  }

  private resetMessages() {
    this.message = null
    this.emailMessage = null;
    this.passwordMessage = null;
    this.verifyPasswordMessage = null;
    this.firstNameMessage = null;
    this.lastNameMessage = null;
  }

}
