import { Component,  ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LocalService } from '@app/local.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class NavbarAdminComponent {
  @ViewChild('themeToggle') themeToggle: ElementRef | undefined;

  constructor(private renderer: Renderer2, private localStore: LocalService) {}

  ngAfterViewInit() {

    // get dark theme from local
    const darktheme = localStorage.getItem("darktheme");
    if(darktheme?.match("true")){
      this.setBodyClass('dark');
      const checkboxElement: HTMLInputElement = this.themeToggle?.nativeElement;
      checkboxElement.checked = true;
    }else{
      this.setBodyClass('');
    }

    if (this.themeToggle?.nativeElement) {
      this.renderer.listen(this.themeToggle.nativeElement, 'change', () => {
        if (this.themeToggle?.nativeElement.checked) {
          this.setBodyClass('dark');
          localStorage.setItem("darktheme", "true");
          // console.log("yo");
        } else {
          this.setBodyClass(''); // Remove the 'dark' class
          localStorage.setItem("darktheme", "false");
          // console.log("yo2");
        }
      });
    }

    // get sidebar from local
    const sideBar = document.querySelector('.sidebarD');
    const contentClose = document.querySelector('.content');
    // const sideBarSmall = localStorage.getItem("sidebarSmall");

    // if(sideBarSmall?.match("true")){
    //   this.renderer.addClass(sideBar, 'closeD');
    //   this.renderer.addClass(contentClose, 'contentCloseD');
    // }else if(sideBarSmall?.match("false")) {
    //   this.renderer.removeClass(sideBar, 'closeD');
    //   this.renderer.removeClass(contentClose, 'contentCloseD');
    // }

  }

  setBodyClass(className: string) {
    const bodyElement = document.querySelector('.body-admin'); // Select the div with class 'body'
    const sideBarElement = document.querySelector('.sidebarD');
    const navElement = document.querySelector('.contentNav');
    if(className.match('dark')){
      if (bodyElement) {
        this.renderer.addClass(bodyElement, className);
        this.renderer.addClass(sideBarElement, className);
        this.renderer.addClass(navElement, className);
      }
    }else{
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
        localStorage.setItem("sidebarSmall", "true");
    } else {
      this.temp = false;
      this.renderer.removeClass(sideBar, 'closeD');
      this.renderer.removeClass(contentClose, 'contentCloseD');
      localStorage.setItem("sidebarSmall", "false");
    }
  }


}

