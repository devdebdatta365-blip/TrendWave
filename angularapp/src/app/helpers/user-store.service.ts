
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private authUserSubject = new BehaviorSubject<User | null>(null);
  authUser$ = this.authUserSubject.asObservable();

  constructor() {
    const userJson = localStorage.getItem('authUser');
    if (userJson) {
      this.authUserSubject.next(JSON.parse(userJson));
    }
  }

  setUser(user: User | null): void {
    this.authUserSubject.next(user);
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }

  get authUser(): User | null {
    return this.authUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.authUserSubject.value;
  }

  clearUser(): void {
    this.authUserSubject.next(null);
    localStorage.removeItem('authUser');
  }
}
