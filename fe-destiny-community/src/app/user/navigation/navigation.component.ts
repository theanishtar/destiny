import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

// import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { GetStartedComponent } from '@app/get-started/get-started.component';
import { LoginService } from '@app/service/login.service';
import { MessageService } from '../service/message.service';
import { ProfileService } from '../service/profile.service';
import { ModalService } from '../service/modal.service';
import { MessageType } from '../Model/NotifyModel';
import { UIServiveService } from '../service/ui-servive.service';
import { ReportService } from '../service/report.service';
import { FollowsService } from '../service/follows.service';
import '../../../assets/toast/main.js';
declare var toast: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    // `../../css/dark/dark.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './navigation.component.css'
  ]
})

export class NavigationComponent implements OnInit {
  userDisplayName: any;
  avatar: any;
  activeMenuItem: string = '';
  chatUserId: any;
  searchTerm: string = '';
  searchTermMobile: string = '';
  listSearch: any[] = [];
  listSearchPost: any[] = [];
  listSearchHashTag: any[] = [];
  ngOnInit() {
    this.userDisplayName = localStorage.getItem('full_name');
    this.avatar = localStorage.getItem("avatar");
    this.chatUserId = parseInt((localStorage.getItem("chatUserId") + '')?.trim());
    this.uiServiveService.loadMode();
    this.updateActiveMenuItem();
    
  }

  constructor(
    // public cookieService: CookieService,
    private loginService: LoginService,
    private router: Router,
    public messageService: MessageService,
    public profileService: ProfileService,
    public modalService: ModalService,
    private el: ElementRef,
    private renderer: Renderer2,
    private uiServiveService: UIServiveService,
    public reportService: ReportService,
    private followsService: FollowsService
  ) {
    this.router.events.subscribe((event) => {
    //   this.userDisplayName = localStorage.getItem('full_name');
    // this.avatar = localStorage.getItem("avatar");
      this.chatUserId = parseInt((localStorage.getItem("chatUserId") + '')?.trim());
      this.userDisplayName = localStorage.getItem('full_name')!;
      if (event instanceof NavigationEnd) {
        // Đã chuyển đến trang mới, thực hiện cập nhật menu active
        this.updateActiveMenuItem();
      }
    });
  }

  async search(value) {
    let user_id: number | null = null;
  
    const storedUserId = localStorage.getItem('chatUserId');
    if (storedUserId !== null) {
      user_id = parseInt(storedUserId, 10);
      this.listSearch = await this.modalService.searchApi(user_id, value);
      this.listSearchPost = await this.modalService.searchPostApi(value, 'content');
      this.listSearchHashTag = await this.modalService.searchPostApi(value, 'hashtag');
    }
  }

  isLogin() {
    return this.loginService.isLogin();
  }

  logout() {
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
    if (type == 'MENTION') {
      return 'MENTION';
    }
    if (type == 'POST') {
      return 'POST';
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
    this.followsService.reLoadDataFriends();
  }
  updateActiveMenuItem() {
    // console.warn("this.activeMenuItem: " + this.activeMenuItem)
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

  reloadPage(){
    location.reload();
  }

}
