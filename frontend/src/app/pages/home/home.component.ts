import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {BannerService} from "../../services/banner.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any;
  banners: any;
  constructor(private product: ProductService,
              private bannerService: BannerService) { }

  ngOnInit(): void {
    this.setBanners();
  }

  public setBanners(): void {
    this.bannerService.getBanner().subscribe(data => {
      this.banners = data;
      console.log(this.banners)
    })
  }
}
