import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';

import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth : AuthService ){ }
  canActivate():Observable<boolean>{
    return this.auth.appUser$.map(user=>{
      if (user) 
      return true;
  } );
  }}