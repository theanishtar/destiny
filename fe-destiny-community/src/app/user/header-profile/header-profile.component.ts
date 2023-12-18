import { Component, OnInit, ElementRef, ViewChild, HostListener  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../service/profile.service';
import { MessageService } from '../service/message.service';
import { FollowsService } from '../service/follows.service';
import '../../../assets/toast/main.js';
declare var toast: any;
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
export class HeaderProfileComponent implements OnInit {
  activeMenuItem: string = '';
  dataProfileTimeline: any;
  isLoading = true;
  idLocal: any;
  chatUserId: any;
  dataFollows: any;
  checkHeaderEdit: boolean = true;
  checkWidthMedia: boolean = true;

  ngOnInit() {
    this.idLocal = parseInt((localStorage.getItem("idSelected") + '')?.trim());
    this.chatUserId = parseInt((localStorage.getItem("chatUserId") + '')?.trim());
    this.profileService.loadDataProfileHeader(this.idLocal);
    this.checkScreenSize();
  }

  constructor(
    private cookieService: CookieService,
    private router: Router,
    public profileService: ProfileService,
    public messageService: MessageService,
    public followsService: FollowsService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Đã chuyển đến trang mới, thực hiện cập nhật menu active
        this.updateActiveMenuItem();
      }
    });

  }
  addFollow(id: number) {
    this.followsService.addFollowAPI(id).subscribe((res) => {
      new toast({
        title: 'Thông báo!',
        message: 'Đã theo dõi',
        type: 'success',
        duration: 3000,
      })
      // location.reload();
    });
  }
  /* ============template============= */
  updateActiveMenuItem() {
    const currentUrl = this.router.url;
    // Xác định menu item active dựa trên URL hiện tại
    // Ví dụ: nếu có '/home' trong URL, đặt activeMenuItem thành 'home'
    if (currentUrl.includes('/profile')) {
      this.activeMenuItem = 'profile';
      this.checkHeaderEdit = true;
    }
    // Tương tự cho các menu item khác
    if (currentUrl.includes('/edit-profile')) {
      this.activeMenuItem = 'edit-profile';
      this.checkHeaderEdit = false;
    }
    if (currentUrl.includes('/follow')) {
      this.activeMenuItem = 'follow';
      this.checkHeaderEdit = true;
    }
    if (currentUrl.includes('/photos')) {
      this.activeMenuItem = 'photos';
      this.checkHeaderEdit = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize() {
    // Kiểm tra kích thước màn hình ở đây
    if (window.innerWidth <= 1285) {
      this.checkWidthMedia = false; // Cài đặt giá trị khi kích thước màn hình nhỏ hơn hoặc bằng 1280px
    } else {
      this.checkWidthMedia = true; // Cài đặt giá trị khi kích thước màn hình lớn hơn 1280px
    }
  }
}
