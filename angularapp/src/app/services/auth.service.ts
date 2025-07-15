
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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = 'https://ide-dacabdbfceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, user);
  }

  login(loginData: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, loginData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }
}