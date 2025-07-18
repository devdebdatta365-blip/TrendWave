

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl:string = 'https://ide-dacabdbfceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080/api';

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
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return !!token && !!userId && userId !== '0';
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
    const userId = localStorage.getItem('userId');
    const parsedUserId = Number(userId);
    
    // If userId is 0 or invalid, redirect to login
    if (!userId || parsedUserId === 0) {
      console.warn('Invalid user ID, redirecting to login');
      this.logout();
      return 0;
    }
    
    return parsedUserId;
  }

  getToken():string{
    return localStorage.getItem('token')||'';
  }

  //logout
  logout():void{
    localStorage.clear();
    this.loggedIn.next(false);
    this.userRole.next(null);
    this.userId.next(null);
    this.router.navigate(['/login']);
  }

  private hasToken():boolean{
    return !!localStorage.getItem('token');
  }
}