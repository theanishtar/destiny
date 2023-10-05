import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './header-profile.component.css'
  ]
})
export class HeaderProfileComponent implements OnInit{
  activeMenuItem: string = '';
  ngOnInit() {
  }
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Đã chuyển đến trang mới, thực hiện cập nhật menu active
        this.updateActiveMenuItem();
      }
    });
   }

  updateActiveMenuItem() {
    const currentUrl = this.router.url;
    // Xác định menu item active dựa trên URL hiện tại
    // Ví dụ: nếu có '/home' trong URL, đặt activeMenuItem thành 'home'
    if (currentUrl.includes('/profile')) {
      this.activeMenuItem = 'profile';
    }
    // Tương tự cho các menu item khác
    if (currentUrl.includes('/edit-profile')) {
      this.activeMenuItem = 'edit-profile';
    }
    if (currentUrl.includes('/follow')) {
      this.activeMenuItem = 'follow';
    }
    if (currentUrl.includes('/photos')) {
      this.activeMenuItem = 'photos';
    }
  }
}
