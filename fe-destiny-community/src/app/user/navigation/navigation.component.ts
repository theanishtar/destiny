import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GetStartedComponent } from '@app/get-started/get-started.component';
import { LoginService } from '@app/service/login.service';
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
  ngOnInit() {
    this.userDisplayName = this.cookieService.get('full_name');  
    this.activeMenuItem();
  }
  
  constructor(
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router,
  ) { }

  isLogin(){
    return this.loginService.isLogin();
  }

  logout(){
    return this.loginService.logout();
  }

  activeMenuItem() {
    // Lấy tất cả các menu item
    const menuItems = document.querySelectorAll('.menu-item');

    // Lặp qua từng menu item và thêm sự kiện click vào chúng
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        // Loại bỏ class "active" từ tất cả các menu item
        menuItems.forEach(menuItem => {
          menuItem.classList.remove('active');
        });

        // Thêm class "active" vào menu item được click
        item.classList.add('active');

        // Lưu trạng thái "active" vào Local Storage
        localStorage.setItem('activeMenuItem', item.textContent!);
      });
    });

    // Khôi phục trạng thái "active" từ Local Storage khi trang tải lại
    const activeMenuItem = localStorage.getItem('activeMenuItem');
    if (activeMenuItem !== null) {
      menuItems.forEach(item => {
        if (item.textContent === activeMenuItem) {
          item.classList.add('active');
        }
      });
    }
  }
}
