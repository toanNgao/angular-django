import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {HttpParams} from "@angular/common/http";
import {TokenService} from "../../services/token.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegisterForm!: FormGroup
  constructor(private userService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private tokenService: TokenService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userRegisterForm = this.fb.group({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    })
  }

  register() {
    const user = this.userRegisterForm.value;
    console.log(user);
    if (user.password == user.password2) {
      const body = new HttpParams()
        .set('first_name', user.first_name)
        .set('last_name', user.last_name)
        .set('username', user.username)
        .set('password', user.password)
        .set('email', user.email)

      this.userService.register(body).subscribe((data: any) => {
        console.log(data);

        const user_id = new HttpParams()
          .set('user', data.id)

        this.cartService.addCart(user_id).subscribe(res => {
          console.log(res)
        })
        alert('Welcome to Shop Fashion!')
        this.router.navigate(['/login']);
      })
    } else {
      alert("Nhập lại mật khẩu!")
    }


  }
}
