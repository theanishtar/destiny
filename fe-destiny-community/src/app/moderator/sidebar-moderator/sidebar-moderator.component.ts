import { Component, OnInit, HostListener, Renderer2, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '@app/service/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-sidebar-moderator',
  templateUrl: './sidebar-moderator.component.html',
  styleUrls: [
    `../../admin/css/sb-admin-2.min.css`,
    `../../admin/css/home.css`
  ]
})
export class SidebarModeratorComponent implements OnInit {
  activeMenuItem: string = '';

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Đã chuyển đến trang mới, thực hiện cập nhật menu active
        this.updateActiveMenuItem();
      }
    });
  }

  @ViewChildren('mainColorLink')
  mainColorLinks!: QueryList<ElementRef>;

  role: any;

  getUserRole() {
    // Lấy vai trò của người dùng từ dịch vụ hoặc nơi lưu trữ.
    // Ví dụ: return this.loginService.getUserRole();
    return this.cookieService.get('role'); // Đây là ví dụ, bạn cần thay thế bằng cách lấy thực tế.
  }

  ngOnInit(): void {
    this.role = this.getUserRole();
    this.updateActiveMenuItem();
  }

  ngAfterViewInit(): void {
    const bodyElement = document.querySelector('.body-admin');
    const sidebarElement = document.querySelector('.sidebarD');
    const colortheme = localStorage.getItem("colortheme");
    if (bodyElement) {
      this.renderer.addClass(bodyElement, String(colortheme));
      this.renderer.addClass(sidebarElement, String(colortheme));
    }

    const sideLinks: NodeListOf<HTMLElement> = document.querySelectorAll(
      ".sidebarD .side-menu li a:not(.logout):not(.clickSetting)"
    );

    sideLinks.forEach((item: HTMLElement) => {
      item.addEventListener("click", () => {
        sideLinks.forEach((i: HTMLElement) => {
          this.renderer.removeClass(i.parentElement, "active");
        });
        localStorage.setItem("sidebarActive", item.className);
      });
    });

    this.mainColorLinks.forEach((item: ElementRef) => {
      const li = item.nativeElement;
      li.addEventListener('click', () => {
        this.mainColorLinks.forEach((i: ElementRef) => {
          i.nativeElement.classList.remove('border-active');
        });
        li.classList.add('border-active');
      });
    });
  }

  mainColor = ["pink", "blue", "green", "orange", "cyan"];

  setMainColor(value: string) {
    const bodyElement = document.querySelector('.body-admin'); // Select the div with class 'body'
    const sidebarElement = document.querySelector('.sidebarD');
    this.mainColor.forEach((item: string) => {
      if (!item.match(value)) {
        if (bodyElement) {
          this.renderer.removeClass(bodyElement, item);
          this.renderer.removeClass(sidebarElement, item);
          localStorage.removeItem("colortheme");
        }
      }
    });
    if (bodyElement) {
      this.renderer.addClass(bodyElement, value);
      this.renderer.addClass(sidebarElement, value);
      localStorage.setItem("colortheme", value);
    }
  }

  isNavOpen = false;
  open = 0;
  openNav(): void {
    this.open++;
    this.isNavOpen = true;
    if (this.open > 1) {
      this.closeNav();
      this.open = 0;
    }
  }

  closeNav(): void {
    this.isNavOpen = false;
    this.open = 0;
  }

  @HostListener('window:load', ['$event'])
  onWindowLoad(event: Event): void {
    this.toggleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.toggleSidebar();
  }

  private toggleSidebar(): void {
    const sideBar = document.querySelector('.sidebarD');
    const contentClose = document.querySelector('.content');
    if (sideBar) {
      if (window.innerWidth < 1300) {
        this.renderer.addClass(sideBar, 'closeD');
        this.renderer.addClass(contentClose, 'contentCloseD');
      } else {
        this.renderer.removeClass(sideBar, 'closeD');
        this.renderer.removeClass(contentClose, 'contentCloseD');
      }
    }
  }

  updateActiveMenuItem() {
    const currentUrl = this.router.url;
    // Xác định menu item active dựa trên URL hiện tại
    // Ví dụ: nếu có '/home' trong URL, đặt activeMenuItem thành 'home'
    if (currentUrl.includes('/moderator/forbidden-word')) {
      this.activeMenuItem = 'forbidden-word';
    }
    // Tương tự cho các menu item khác
    if (currentUrl.includes('/moderator/post-report')) {
      this.activeMenuItem = 'post-report';
    }
    if (currentUrl.includes('/moderator/post-report-detail')) {
      this.activeMenuItem = 'post-report-detail';
    }
    if (currentUrl.includes('/moderator/user-report')) {
      this.activeMenuItem = 'user-report';
    }
    if (currentUrl.includes('/moderator/user-report-detail')) {
      this.activeMenuItem = 'user-report-detail';
    }
  }

  logout() {
    return this.loginService.logout();
  }
}
