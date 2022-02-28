import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {OrderService} from "../../services/order.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CartService} from "../../services/cart.service";
import {validateAndRewriteCoreSymbol} from "@angular/compiler-cli/src/ngtsc/imports";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  orderForm!: FormGroup;
  user: any;
  cart: any;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private cartService: CartService,
              private formBuilder: FormBuilder,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.orderForm = this.formBuilder.group({
      'first_name': new FormControl(null, [Validators.required]),
      'last_name': new FormControl(null, [Validators.required]),
      'phone_number': new FormControl(null, [Validators.required]),
      'shipping_address': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'cart': new FormControl(),
      'user': new FormControl()
    })
  }

  public setUser(): void {
    const accessToken = this.tokenService.getAccessToken()
    this.authService.getCurrentUser(accessToken).subscribe(data => {
      this.user = data;
      // console.log(this.user)
    })
  }

  public setCart(user_id: number): void {
    const accessToken = this.tokenService.getAccessToken()
    this.cartService.getCart(accessToken, user_id).subscribe(data => {
      this.cart = data;
      console.log(this.cart)
    })
  }

  public order(): void {
    this.authService.getCurrentUser(this.tokenService.getAccessToken()).subscribe(data => {
      this.cartService.getCart(this.tokenService.getAccessToken(), data.id).subscribe(res => {
        this.orderForm.patchValue({
          'cart': res[0].id,
          'user': data.id,
        })
        const body = this.orderForm.value;
        console.log(body)
        this.orderService.order(this.tokenService.getAccessToken(), body).subscribe(data => {
          console.log(data)
          console.log(body)
        });
      })
    })
  }
}
