import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://ide-adcbdffbcceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080/api";

  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(user:User): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`,user);
  }

  login(credentials: Login):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`,credentials);
  }

  logout():void{
    localStorage.removeItem('token');
    this.userRoleSubject.next(null);
    this.userIdSubject.next(null);
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem('token');
  }

  getUserRole():string | null{
    return this.userRoleSubject.value;
  }


  getCurrentUserId():number | null{
    return this.userIdSubject.value;
  }


}
