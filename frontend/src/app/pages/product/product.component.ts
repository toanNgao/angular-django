import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

import { Product } from 'src/app/models/product';
import {TokenService} from "../../services/token.service";
import {CartService} from "../../services/cart.service";
import {HttpParams} from "@angular/common/http";
import {CartComponent} from "../cart/cart.component";
import {AuthService} from "../../services/auth.service";
import {catchError} from "rxjs/operators";

const COLOR: any = [
  {id: 0, color: 'red'},
  {id: 1, color: 'pink'},
  {id: 2, color: 'black'},
  {id: 3, color: 'white'},
  {id: 4, color: 'blue'},
]

const SIZE: any = [
  {id: 0, size: 'S'},
  {id: 1, size: 'M'},
  {id: 2, size: 'L'},
  {id: 3, size: 'XL'},
  {id: 4, size: 'XXL'},
]

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: any;
  itemPro: any;
  colorProduct = COLOR;
  sizeProduct = SIZE;
  color: number = 0;
  size: number = 0;
  quantity: number = 1;

  constructor(private product: ProductService,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenService,
              private authService: AuthService,
              private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.productId = params.get('id');
      console.log(this.productId);
    })
    this.setProductById(this.productId);
  }

  setProductById(id: any): void {
    this.product.getProductById(id).subscribe((res: any) => {
      this.itemPro = res.results[0];
      console.log(this.itemPro)
    })
  }

  setColor(color: number): void {
    this.color = color
    console.log(this.color)
  }

  setSize(size: number): void {
    this.size = size
    console.log(this.size)
  }

  upQuantity(): void {
    this.quantity += 1;
    console.log(this.quantity)
  }

  downQuantity(): void {
    this.quantity -= 1;
    if(this.quantity < 1)
      this.quantity = 1
    console.log(this.quantity)
  }

  addToCartItem(): void {
    this.router.navigate(['cart/'])
    this.authService.getCurrentUser(this.tokenService.getAccessToken()).subscribe(res => {
      this.cartService.getCart(this.tokenService.getAccessToken(), res.id).subscribe(data => {
        console.log(data[0].id)
        const body = new HttpParams()
          .set('quantity', this.quantity)
          .set('color', this.color)
          .set('size', this.size)
          .set('product', this.productId)
          .set('cart', data[0].id)
        this.cartService.addCartItem(this.tokenService.getAccessToken(), body).subscribe(data => {
          console.log(data)
        })
      });
    });
  }
}
