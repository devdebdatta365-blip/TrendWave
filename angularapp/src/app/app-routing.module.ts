// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'adminnav',component:AdminnavComponent},
  {path:'usernav',component:UsernavComponent},
  {path:'adminviewproduct',component:AdminviewproductComponent},
  {path:'product-create',component:ProductCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
