import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Product } from '../models/product';

const URL = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  public api_link = URL + 'api-products/';

  constructor(private httpClient: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<any>(this.api_link + 'categories/')
  }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<any>(this.api_link + 'products/')
  }

  public getProductsByCateId(cate_id: any): Observable<Product[]> {
    return this.httpClient.get<any>(this.api_link + 'products/?cate_id=' + cate_id)
  }

  public getProductById(product_id: any): Observable<Product> {
    return this.httpClient.get<Product>(this.api_link + 'products/?id=' + product_id)
  }
}
