import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HeaderComponent } from './block/header/header.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { ContractComponent } from './pages/contract/contract.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LookbookComponent } from './pages/lookbook/lookbook.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import {AuthGuardGuard} from "./services/auth-guard.guard";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog-post', component: BlogPostComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardGuard]},
  { path: 'category/:id', component: CategoryComponent },
  { path: 'category', component: CategoryComponent},
  { path: 'checkout', component: CheckOutComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'lookbook', component: LookbookComponent },
  { path: 'category/:id/product/:id', component: ProductComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
