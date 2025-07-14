import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import all components
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { MyreviewComponent } from './components/myreview/myreview.component';
import { ReviewComponent } from './components/review/review.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './components/authguard/auth.guard';

const routes: Routes = [
  // Default route: redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth & landing
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Home page (protected)
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },

  // Admin navigation bar (protected)
  { path: 'adminnav', component: AdminnavComponent, canActivate: [AuthGuard] },

  // User navigation bar (protected)
  { path: 'usernav', component: UsernavComponent, canActivate: [AuthGuard] },

  // Admin: Product management (protected)
  { path: 'adminviewproduct', component: AdminviewproductComponent, canActivate: [AuthGuard] },
  { path: 'product-create', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'product-create/:productId', component: ProductCreateComponent, canActivate: [AuthGuard] }, // For editing

  // Admin: Orders (protected)
  { path: 'orderplaced', component: OrderplacedComponent, canActivate: [AuthGuard] },

  // Admin: Reviews (protected)
  { path: 'adminviewreviews', component: AdminviewreviewsComponent, canActivate: [AuthGuard] },

  // User: Product browsing (protected)
  { path: 'userviewproduct', component: UserviewproductComponent, canActivate: [AuthGuard] },

  // User: Orders (protected)
  { path: 'myorder', component: MyorderComponent, canActivate: [AuthGuard] },

  // User: Reviews (protected)
  { path: 'myreview', component: MyreviewComponent, canActivate: [AuthGuard] },
  { path: 'review/:productId', component: ReviewComponent, canActivate: [AuthGuard] }, // Write review for product

  // User: Checkout (protected)
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  // Error page
  { path: 'error', component: ErrorComponent },

  // Wildcard: redirect to error or login
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
