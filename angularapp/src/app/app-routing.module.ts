import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { ReviewComponent } from './components/review/review.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { MyorderComponent } from './components/myorder/myorder.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' }, 
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'adminnav',component:AdminnavComponent},
  {path:'usernav',component:UsernavComponent},
  {path:'orderplaced', component:OrderplacedComponent},
  {path:'reviews', component:ReviewComponent},
  {path:'adminviewproduct', component:AdminviewproductComponent},
  {path:'userviewproduct', component:UserviewproductComponent},
  {path:'myorders', component:MyorderComponent},
  {path:'', component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
