import { HttpClientModule} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
  providers: [HttpClientModule]

})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router

    
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
  
    if (this.loginFormGroup.invalid) {
      return;
    }
  
    if (this.loginFormGroup.value.email && this.loginFormGroup.value.password) {
      // if email and password fields have values
      this.router.navigate(['/dashboard']); // navigate to dashboard route
    } else {
      // email and/or password fields are empty
      this.authError = true;
      this.authMessage = 'Email or Password are wrong';
    }
  }
  
  
  
  
  
  
  

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
