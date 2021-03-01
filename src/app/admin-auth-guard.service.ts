import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
// import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/Map';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
   constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admins only')
        }
      })
    );

  }

}