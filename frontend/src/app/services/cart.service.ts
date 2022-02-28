import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  api_link = URL + 'api-cart/'

  constructor(private httpClient: HttpClient) { }
  public getCartItemByCartId(accessToken: string, cartId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    })

    return this.httpClient.get(this.api_link + 'cart/' + cartId + '/cart-item/', {
      headers: headers
    })
  }

  public addCartItem(accessToken: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    })
    return this.httpClient.post(this.api_link + 'cart-item/', body, {
      headers: headers
    })
  }

  public getCart(accessToken: string, user_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    })
    return this.httpClient.get(this.api_link + 'cart/?user_id=' + user_id, {
      headers: headers
    })
  }

  public addCart(body: any): Observable<any> {
    return this.httpClient.post(this.api_link + 'cart/', body)
  }
}
