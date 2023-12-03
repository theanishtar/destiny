import { Component, OnInit, HostListener, Renderer2, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '@app/service/login.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class SidebarAdminComponent implements OnInit{
  activeMenuItem: string = '';

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private loginService: LoginService
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

  ngOnInit(): void {
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
    if (currentUrl.includes('/admin')) {
      this.activeMenuItem = 'admin';
    }
    // Tương tự cho các menu item khác
    if (currentUrl.includes('/admin/postmanament')) {
      this.activeMenuItem = 'postmanament';
    }
    if (currentUrl.includes('/admin/postreportdetail')) {
      this.activeMenuItem = 'postreportdetail';
    }
    if (currentUrl.includes('/admin/usermanament')) {
      this.activeMenuItem = 'usermanament';
    }
    if (currentUrl.includes('/admin/userreportdetail')) {
      this.activeMenuItem = 'userreportdetail';
    }
    if (currentUrl.includes('/admin/profileadmin')) {
      this.activeMenuItem = '';
    }
  }

  logout() {
    return this.loginService.logout();
  }
}
