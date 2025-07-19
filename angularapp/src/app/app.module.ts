

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AdminNavComponent } from "./components/adminnav/adminnav.component";
import { AdminViewProductComponent } from "./components/adminviewproduct/adminviewproduct.component";
import { AdminViewReviewsComponent } from "./components/adminviewreviews/adminviewreviews.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ErrorComponent } from "./components/error/error.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { LoginComponent } from "./components/login/login.component";
import { MyOrderComponent } from "./components/myorder/myorder.component";
import { MyReviewComponent } from "./components/myreview/myreview.component";
import { OrderplacedComponent } from "./components/orderplaced/orderplaced.component";
import { ProductCreateComponent } from "./components/product-create/product-create.component";
import { ReviewComponent } from "./components/review/review.component";
import { SignupComponent } from "./components/signup/signup.component";
import { UsernavComponent } from "./components/usernav/usernav.component";
import { UserViewProductComponent } from "./components/userviewproduct/userviewproduct.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { AdminnavComponent } from './components/adminnav/adminnav.component';
// import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
// import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
// import { CheckoutComponent } from './components/checkout/checkout.component';
// import { ErrorComponent } from './components/error/error.component';
// import { HomePageComponent } from './components/home-page/home-page.component';
// import { MyorderComponent } from './components/myorder/myorder.component';
// import { MyreviewComponent } from './components/myreview/myreview.component';
// import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
// import { ProductCreateComponent } from './components/product-create/product-create.component';
// import { ReviewComponent } from './components/review/review.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { UsernavComponent } from './components/usernav/usernav.component';
// import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
// import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminNavComponent,
    AdminViewProductComponent,
    AdminViewReviewsComponent,
    CheckoutComponent,
    ErrorComponent,
    HomePageComponent,
    MyOrderComponent,
    MyReviewComponent,
    OrderplacedComponent,
    ProductCreateComponent,
    ReviewComponent,
    SignupComponent,
    UsernavComponent,
    UserViewProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
