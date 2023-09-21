import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';

import { LoginService } from './service/login.service';
// import '../../assets/toast/main.js';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
declare var toast: any;


@Injectable({
  providedIn: "root"
})
export class authGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(!this.isLogin()){
      new toast({
        title: 'Thông báo!',
        message: 'Vui lòng đăng nhập!',
        type: 'info',
        duration: 3000,
      });
      this.router.navigate(['**']);
      return false;
    }
    return true;
  }

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  isLogin(){
    return this.loginService.isLogin();
    // return false;
  }
}

