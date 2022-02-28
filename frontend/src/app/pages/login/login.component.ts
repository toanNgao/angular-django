import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import {JwtResponse} from "../../models/jwt-response";
import {TokenService} from "../../services/token.service";
import {CartService} from "../../services/cart.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm!: FormGroup;
  authInfo: any;
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private cartService: CartService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.setAuthInfo();
  }

  initForm() {
    this.userLoginForm = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  setAuthInfo(): void {
    this.authService.getAuthInfo().subscribe(data => {
      this.authInfo = data;
      // console.log(this.authInfo);
    })
  }

  login() {
    const user = this.userLoginForm.value;
    // console.log(user);
    this.authService.login(user, this.authInfo).subscribe((data: JwtResponse) => {
      console.log(data)
      this.authService.getCurrentUser(this.tokenService.getAccessToken()).subscribe(res => {
        alert('Welcome ' + res.last_name + ' ' + res.first_name + '!')
        console.log(res);
      })
      this.authService.isAuthenticated();
      this.router.navigate(['/home'])
    })
  }

}
