import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/services/product.service';
import {AuthService} from "../../services/auth.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Array<Category>;

  constructor(private product: ProductService,
              private authService: AuthService,
              private router: Router) {
    this.categories = new Array<Category>();
  }

  ngOnInit(): void {
    this.setCategories();
  }


  setCategories(): void {
    this.product.getCategories().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories)
    })
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['login/'])
  }

}
