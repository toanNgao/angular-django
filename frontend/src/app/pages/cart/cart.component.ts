import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../../services/token.service";
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  items: any;
  products: any;

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService,
              private productService: ProductService,
              private cartService: CartService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser(this.tokenService.getAccessToken()).subscribe(res => {
      console.log(res);
      this.setCart(res.id);
    });
    this.getProducts();
  }

  public setCart(user_id: number): void {
    this.cartService.getCart(this.tokenService.getAccessToken(), user_id).subscribe(data => {
      this.cart = data[0]
      console.log(this.cart)
      // console.log(data[0].id)
      this.setItems(data[0].id);
    })
  }

  public setItems(cart_id: number): void {
    this.cartService.getCartItemByCartId(this.tokenService.getAccessToken(), cart_id).subscribe(data => {
      this.items = data
      console.log(this.items)
    })
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.results;
      console.log(this.products)
    })
  }
}
