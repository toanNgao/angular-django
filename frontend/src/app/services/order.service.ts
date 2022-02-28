import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";

const URL = 'http://127.0.0.1:8000/'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  api_link = URL + 'api-order/'

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }

  public order(accessToken: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    })
    return this.httpClient.post(this.api_link + 'order/', body, {
      headers: headers
    })
  }
}
