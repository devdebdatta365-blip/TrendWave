import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from 'src/app/helpers/user-store.service';
// import { UserStoreService } from 'src/app/heplers/user-store.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userStore: UserStoreService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // ✅ Check if user is logged in
    if (!this.userStore.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ Check role-based access if route data has 'role'
    const requiredRole = route.data['role'];
    if (requiredRole) {
      const userRole = this.userStore.authUser?.userRole;

      if (userRole !== requiredRole) {
        this.router.navigate(['/error']);
        return false;
      }
    }

    // ✅ Allow navigation
    return true;
  }
}
