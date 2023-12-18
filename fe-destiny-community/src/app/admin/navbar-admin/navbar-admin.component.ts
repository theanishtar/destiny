import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AdminProfileService } from '../service/admin-profile.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class NavbarAdminComponent {
  @ViewChild('themeToggle') themeToggle: ElementRef | undefined;

  adminAvatar: any = {};

  constructor(
    private renderer: Renderer2,
    private adminProfileService: AdminProfileService

  ) { }

  ngAfterViewInit() {

    this.loadAdminAvatar();
    this.setDark();
  }

  loadAdminAvatar() {
    const getAvatar = "getAvatar";
    this.adminProfileService.loadAdminData(getAvatar).subscribe(() => {
      this.adminAvatar = {};
      this.adminAvatar = this.adminProfileService.getAdmin();
    })
  }

  setDark() {
    // get dark theme from local
    const darktheme = localStorage.getItem("darktheme");
    if (darktheme?.match("true")) {
      this.setBodyClass('dark');
      const checkboxElement: HTMLInputElement = this.themeToggle?.nativeElement;
      checkboxElement.checked = true;
    } else {
      this.setBodyClass('');
    }

    if (this.themeToggle?.nativeElement) {
      this.renderer.listen(this.themeToggle.nativeElement, 'change', () => {
        if (this.themeToggle?.nativeElement.checked) {
          this.setBodyClass('dark');
          localStorage.setItem("darktheme", "true");
        } else {
          this.setBodyClass(''); // Remove the 'dark' class
          localStorage.setItem("darktheme", "false");
        }
      });
    }
  }

  setBodyClass(className: string) {
    const bodyElement = document.querySelector('.body-admin'); // Select the div with class 'body'
    const sideBarElement = document.querySelector('.sidebarD');
    const navElement = document.querySelector('.contentNav');
    if (className.match('dark')) {
      if (bodyElement) {
        this.renderer.addClass(bodyElement, className);
        this.renderer.addClass(sideBarElement, className);
        this.renderer.addClass(navElement, className);
      }
    } else {
      if (bodyElement) {
        this.renderer.removeClass(bodyElement, 'dark');
        this.renderer.removeClass(sideBarElement, 'dark');
        this.renderer.removeClass(navElement, 'dark');
      }
    }
  }

  temp = false;
  toggleSideBar(): void {
    const sideBar = document.querySelector('.sidebarD');
    const contentClose = document.querySelector('.content');
    if (!this.temp) {
      this.temp = true;
      this.renderer.addClass(sideBar, 'closeD');
      this.renderer.addClass(contentClose, 'contentCloseD');
    } else {
      this.temp = false;
      this.renderer.removeClass(sideBar, 'closeD');
      this.renderer.removeClass(contentClose, 'contentCloseD');
    }
  }


}

