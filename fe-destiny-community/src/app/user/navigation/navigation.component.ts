import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { GetStartedComponent } from '@app/get-started/get-started.component';
import { LoginService } from '@app/service/login.service';
import { MessageService } from '../service/message.service';
import { ProfileService } from '../service/profile.service';
import { ModalService } from '../service/modal.service';
import { MessageType } from '../Model/NotifyModel';
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
  avatar = '';
  activeMenuItem: string = '';


  ngOnInit() {
    this.userDisplayName = this.cookieService.get('full_name');
    this.avatar = this.cookieService.get("avatar");
  }

  constructor(
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router,
    public messageService: MessageService,
    public profileService: ProfileService,
    public modalService: ModalService,
    private el: ElementRef,
    private renderer: Renderer2, 
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Đã chuyển đến trang mới, thực hiện cập nhật menu active
        this.updateActiveMenuItem();
      }
    });
  }

  isLogin() {
    return this.loginService.isLogin();
  }

  logout() {
    // const navigationWidget = document.getElementById('navigation-widget-mobile');
    // navigationWidget!.classList.toggle('hidden');
    return this.loginService.logout();
  }
  checkType(type: any) {
   
    if (type == 'COMMENT') {
      return 'COMMENT';
    }
    if (type == 'SHARE') {
      return 'SHARE';
    }
    if (type == 'INTERESTED') {
      return 'INTERESTED';
    }
    if (type == 'FOLLOW') {
      return 'FOLLOW';
    }
    if (type == 'REPCOMMENT') {
      return 'REPCOMMENT';
    }
    return null;
  }
  addFollow(id: number) {
    this.modalService.sendNotify(' ', 0, id, 'FOLLOW', this.modalService.repCmtId);
    new toast({
      title: 'Thông báo!',
      message: 'Đã theo dõi',
      type: 'success',
      duration: 3000,
    });
  }
  updateActiveMenuItem() {
    const currentUrl = this.router.url;
    // Xác định menu item active dựa trên URL hiện tại
    // Ví dụ: nếu có '/home' trong URL, đặt activeMenuItem thành 'home'
    if (currentUrl.includes('/newsfeed')) {
      this.activeMenuItem = 'newsfeed';
    }

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

  handleLinkClick(event: Event): void {
    // Xử lý logic khi liên kết được nhấp
    // alert('Link clicked!'+ event);

    const elementsWithPaddSliderClass = document.querySelectorAll('.padd-slider');

    // alert(elementsWithPaddSliderClass.length);
    elementsWithPaddSliderClass.forEach(element => {
      this.renderer.removeAttribute(element, 'style'); // Xóa tất cả các thuộc tính style, bạn có thể thay đổi tùy ý
    });

    // Add your custom logic here
  }

  

}
