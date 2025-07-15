
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { UserStoreService } from '../helpers/user-store.service';
// import { Observable } from 'rxjs';
// import { User } from '../models/user.model';
// import { Login } from '../models/login.model';
// // import { AuthUser } from '../models/auth-user';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private http : HttpClient , private userStore : UserStoreService) { }
//   baseUrl = "https://ide-dacabdbfceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080/auth";
//   register(user:User):Observable<User>{
//     console.log("From Service..")
//     return this.http.post<User>(this.baseUrl+"/register",user);
//   }
//   login(credentials:Login):Observable<User>{
//     return this.http.post<User>(this.baseUrl+"/login",credentials);
//   }
//   logout():void{
//     this.userStore.setUser(null);
//   }

//   isAuthenticated():boolean{
//     return this.userStore.isLoggedIn();
//     }
//   isAdmin():boolean{
//     const authUser=this.userStore.authUser;
//     return authUser?.role === 'ADMIN';
//   }
//   getCurrentUserId():number | null{
//     const authUser=this.userStore.authUser;
//     return authUser ? authUser.userId:null;
//   }

//   getCustomerName():string | null{
//     const authUser=this.userStore.authUser;
//     return authUser?.userName;
//   }
  
// }

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl:string = 'https://ide-bfacbddbceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080/api';

  public loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public userRole = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  public userId = new BehaviorSubject<number | null>(Number(localStorage.getItem('userId')));

  constructor(private http:HttpClient, private router:Router) { }

  //Register user
  register(user:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,user);
  }

  //login user
  
login(login: Login): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, login);
}

  setToken(token: string):void {
    localStorage.setItem('token',token);
    this.loggedIn.next(true);
  }


   //store user details in localstorage  + token too
   storeAuthData(token:string,userId:number,userRole:string):void{
    localStorage.setItem('token',token);
    localStorage.setItem('userId',userId.toString());
    localStorage.setItem('userRole',userRole);
    this.loggedIn.next(true);
    this.userRole.next(userRole);
    this.userId.next(userId);
  }

  //check login status
  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  isAdmin():boolean{
    return localStorage.getItem('userRole')==='ADMIN';
  }

  isTraveller():boolean{
    return localStorage.getItem('userRole')==='USER';
  }
  
  getUserRole():string{
    return localStorage.getItem('userRole')||'';
  }

  getUserId():number{
    return Number(localStorage.getItem('userId')||'0');
  }

  getToken():string{
    return localStorage.getItem('token')||'';
  }

  //logout
  logout():void{
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private hasToken():boolean{
    return !!localStorage.getItem('token');
  }
}
