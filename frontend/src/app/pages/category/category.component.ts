import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products: Array<Product>
  categories: Category[];
  cate_id: any; 

  constructor(private product: ProductService, private activatedRoute: ActivatedRoute) {
    this.products = new Array<Product>();
    this.categories = new Array<Category>();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.cate_id = params.get('id');
      console.log(this.cate_id);
    })
    this.setProductByCateId(this.cate_id);
    this.setCategories();
  }

  setProducts(): void {
    this.product.getProducts().subscribe((res: any) => {
      this.products = res.results;
      console.log(this.products)
    })
  }

  setCategories(): void {
    this.product.getCategories().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories)
    })
  }

  setProductByCateId(id: any): void {
    this.product.getProductsByCateId(id).subscribe((res: any) => {
      this.products = res.results;
      console.log(this.products)
    })
  }

}
