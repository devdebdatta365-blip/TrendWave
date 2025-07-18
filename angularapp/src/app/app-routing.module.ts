

// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { ReviewComponent } from './components/review/review.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminNavComponent } from './components/adminnav/adminnav.component';
import { AdminViewProductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { UserViewProductComponent } from './components/userviewproduct/userviewproduct.component';
import { AdminViewReviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
import { MyOrderComponent } from './components/myorder/myorder.component';
import { MyReviewComponent } from './components/myreview/myreview.component';

const routes: Routes = [
  // Default route
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  // Admin routes with AuthGuard
  {
    path: 'adminnav',
    component: AdminNavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'adminviewproduct', pathMatch: 'full' },
      { path: 'adminviewproduct', component: AdminViewProductComponent },
      { path: 'adminviewreviews', component: AdminViewReviewsComponent },
      { path: 'orderplaced', component: OrderplacedComponent },
      { path: 'product-create', component: ProductCreateComponent }
    ]
  },
  
  // User routes with AuthGuard
  {
    path: 'usernav',
    component: UsernavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home-page', pathMatch: 'full' },
      { path: 'home-page', component: HomePageComponent },
      { path: 'userviewproduct', component: UserViewProductComponent },
      { path: 'myorder', component: MyOrderComponent },
      { path: 'myreview', component: MyReviewComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'review', component: ReviewComponent }
    ]
  },
  
  // Direct routes (with AuthGuard)
  { path: 'adminviewproduct', component: AdminViewProductComponent, canActivate: [AuthGuard] },
  { path: 'adminviewreviews', component: AdminViewReviewsComponent, canActivate: [AuthGuard] },
  { path: 'orderplaced', component: OrderplacedComponent, canActivate: [AuthGuard] },
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'userviewproduct', component: UserViewProductComponent, canActivate: [AuthGuard] },
  { path: 'myorder', component: MyOrderComponent, canActivate: [AuthGuard] },
  { path: 'myreview', component: MyReviewComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'review', component: ReviewComponent, canActivate: [AuthGuard] },
  { path: 'product-create', component: ProductCreateComponent, canActivate: [AuthGuard] },
  
  // Error route
  { path: 'error', component: ErrorComponent },
  
  // Wildcard route - must be last
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


