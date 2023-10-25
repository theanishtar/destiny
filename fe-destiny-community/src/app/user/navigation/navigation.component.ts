import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { GetStartedComponent } from '@app/get-started/get-started.component';
import { LoginService } from '@app/service/login.service';
import { MessageService } from '../service/message.service';
<<<<<<< HEAD
import { ProfileService } from '../service/profile.service';
import { ModalService } from '../service/modal.service';

=======
>>>>>>> status-online
import '../../../assets/toast/main.js';
declare var toast: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './navigation.component.css'
  ]
})

export class NavigationComponent implements OnInit {
  userDisplayName = '';
<<<<<<< HEAD
  avatar = '';
=======
>>>>>>> status-online
  activeMenuItem: string = '';

  ngOnInit() {
    this.userDisplayName = this.cookieService.get('full_name');  
<<<<<<< HEAD
    this.avatar = this.cookieService.get("avatar");
=======
>>>>>>> status-online
  }
  
  constructor(
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router,
<<<<<<< HEAD
    public messageService: MessageService,
    public profileService: ProfileService,
    public modalService: ModalService
=======
    public messageService: MessageService
>>>>>>> status-online
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Đã chuyển đến trang mới, thực hiện cập nhật menu active
        this.updateActiveMenuItem();
      }
    });
   }

  isLogin(){
    return this.loginService.isLogin();
  }

  logout(){
    return this.loginService.logout();
  }

  updateActiveMenuItem() {
    const currentUrl = this.router.url;
    // Xác định menu item active dựa trên URL hiện tại
    // Ví dụ: nếu có '/home' trong URL, đặt activeMenuItem thành 'home'
    if (currentUrl.includes('/newsfeed')) {
      this.activeMenuItem = 'newsfeed';
    }
    // Tương tự cho các menu item khác
    if (currentUrl.includes('/follow')) {
      this.activeMenuItem = 'follow';
    }
    if (currentUrl.includes('/history')) {
      this.activeMenuItem = 'history';
    }
    if (currentUrl.includes('/contact')) {
      this.activeMenuItem = 'contact';
    }
    if (currentUrl.includes('/setting')) {
      this.activeMenuItem = 'setting';
    }
    if (currentUrl.includes('/message')) {
      this.activeMenuItem = 'message';
    }
  }

  
}
