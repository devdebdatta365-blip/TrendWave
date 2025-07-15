// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { User } from '../models/user.model';
// import { Login } from '../models/login.model';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   public apiUrl = 'https://ide-ddbfeafaaceaeceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080';
//   private loggedIn = new BehaviorSubject<boolean>(false);
//   private userRole = new BehaviorSubject<string>('');
//   private userId = new BehaviorSubject<number | null>(null);

//   constructor(private http: HttpClient) {}

//   register(user: User): Observable<any> {
//     return this.http.post(`${this.apiUrl}/api/register`, user);
//   }

//   login(login: Login): Observable<any> {
//     return this.http.post(`${this.apiUrl}/api/login`, login);
//   }

//   setToken(token: string) {
//     localStorage.setItem('token', token);
//     this.loggedIn.next(true);
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.loggedIn.next(false);
//     this.userRole.next('');
//     this.userId.next(null);
//   }

//   isLoggedIn(): Observable<boolean> {
//     return this.loggedIn.asObservable();
//   }

//   setUserRole(role: string) {
//     this.userRole.next(role);
//   }

//   getUserRole(): Observable<string> {
//     return this.userRole.asObservable();
//   }

//   setUserId(id: number) {
//     this.userId.next(id);
//   }

//   getUserId(): Observable<number | null> {
//     return this.userId.asObservable();
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public apiUrl = 'https://ide-ddbfeafaaceaeceabacaaeccaceddbcfdcfcc.project.examly.io/proxy/8080';

  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private userRole = new BehaviorSubject<string>(localStorage.getItem('userRole') || '');
  private userId = new BehaviorSubject<number | null>(
    localStorage.getItem('userId') ? +localStorage.getItem('userId')! : null
  );

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, login);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.loggedIn.next(false);
    this.userRole.next('');
    this.userId.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
    this.userRole.next(role);
  }

  getUserRole(): Observable<string> {
    return this.userRole.asObservable();
  }

  setUserId(id: number): void {
    localStorage.setItem('userId', id.toString());
    this.userId.next(id);
  }

  getUserId(): Observable<number | null> {
    return this.userId.asObservable();
  }
}
