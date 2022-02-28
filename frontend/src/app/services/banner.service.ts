import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  api_link = URL + 'api-banner/'

  constructor(private httpClient: HttpClient) { }

  getBanner(): Observable<any> {
    return this.httpClient.get(this.api_link + 'banner/')
  }
}
