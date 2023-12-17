import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';

import { LoginService } from './service/login.service';
// import '../../assets/toast/main.js';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
declare var toast: any;
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: "root"
})
export class authGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    function delay(ms: number) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms);
      });
    }
    const isModRouteChangeMail = /^\/(chang-email-confirm)/.test(state.url);
    if (isModRouteChangeMail) {
      return true;
    } else {
      // alert(localStorage.getItem('token') === null);
      if (!this.loginService.isLogin()) {
        new toast({
          title: 'Thông báo!',
          message: 'Vui lòng đăng nhập!',
          type: 'info',
          duration: 3000,
        });
        delay(2000).then((res) => {
          this.location.back();
        });
        return false;
      }

      // Lấy vai trò của người dùng
      const userRole = this.getUserRole();
      const isAdminRoute = /^\/(admin)/.test(state.url);
      const isModRoute = /^\/(moderator)/.test(state.url);
      // Kiểm tra xem người dùng có quyền truy cập trang quản trị không.
      if (userRole === 'ROLE_USER' && (state.url.startsWith('/admin') || state.url.startsWith('/moderator'))) {
        // Người dùng là user và truy cập vào URL bắt đầu bằng '/admin'
        // Xử lý ở đây, có thể chuyển hướng hoặc hiển thị thông báo.
        this.location.back();
        return false;
      }

      if (userRole === 'ROLE_MODERATOR' && !isModRoute) {
        // Người dùng là mod và truy cập vào URL ko bắt đầu bằng '/moderator'
        // Xử lý ở đây, có thể chuyển hướng hoặc hiển thị thông báo.
        this.location.back();
        return false;
      }

      if (userRole === 'ROLE_ADMIN' && !(state.url.startsWith('/admin') || state.url.startsWith('/moderator'))) {
        // Người dùng là admin và truy cập vào URL ko bắt đầu bằng '/admin'
        // Xử lý ở đây, có thể chuyển hướng hoặc hiển thị thông báo.
        this.location.back();
        return false;
      }
      return true;
    }
    // return true;
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
    private location: Location
  ) { }

  isLogin() {
    return this.loginService.isLogin();
    // return false;
  }

  getUserRole() {
    // Lấy vai trò của người dùng từ dịch vụ hoặc nơi lưu trữ.
    // Ví dụ: return this.loginService.getUserRole();
    return this.cookieService.get('role'); // Đây là ví dụ, bạn cần thay thế bằng cách lấy thực tế.
  }
}

