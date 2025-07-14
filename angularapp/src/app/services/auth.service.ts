import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private roleSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post('/api/register', user);
  }

  login(login: Login): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>('/api/login', login).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.roleSubject.next(response.role);
          this.userIdSubject.next(response.userId);
          observer.next(response);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  getRole(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  getUserId(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

}
