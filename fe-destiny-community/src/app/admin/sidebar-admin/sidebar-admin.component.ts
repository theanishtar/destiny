import { Component, HostListener, Renderer2, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { LocalService } from '@app/local.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class SidebarAdminComponent {
  constructor(private renderer: Renderer2) {}

  @ViewChildren('mainColorLink')
  mainColorLinks!: QueryList<ElementRef>;


  j = 0;
  ngAfterViewInit(): void {
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

    const sideBarItemActive = localStorage.getItem("sidebarActive");
    sideLinks.forEach((i: HTMLElement) => {
      if(sideBarItemActive?.match(i.className)){
        this.renderer.addClass(i.parentElement, "active");
      }
      else{
        this.renderer.removeClass(i.parentElement, "active");
      }
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
    const classname = bodyElement?.className.toString;
    this.mainColor.forEach((item: string) => {
      if (!item.match(value)) {
        if (bodyElement) {
          this.renderer.removeClass(bodyElement, item);
        }
      }
    });
    if (bodyElement) {
      this.renderer.addClass(bodyElement, value);
    }
  }

  isNavOpen = false;
  open = 0;
  openNav(): void {
    this.open++;
    this.isNavOpen = true;
    if(this.open > 1){
      this.closeNav();
      this.open = 0;
    }
  }

  closeNav(): void {
    this.isNavOpen = false;
    this.open = 0;
  }

  // @HostListener('window:load', ['$event'])
  // onWindowLoad(event: Event): void {
  //   this.toggleSidebar();
  // }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.toggleSidebar();
  }

  private toggleSidebar(): void {
      // get sidebar from local
    const sideBarSmall = localStorage.getItem("sidebarSmall");
    const sideBar = document.querySelector('.sidebarD');
    const contentClose = document.querySelector('.content');
    if (sideBar) {
      if (window.innerWidth < 1300) {
          this.renderer.addClass(sideBar, 'closeD');
          this.renderer.addClass(contentClose, 'contentCloseD');
      } else {
          if(sideBarSmall?.match("true")){
            this.renderer.addClass(sideBar, 'closeD');
            this.renderer.addClass(contentClose, 'contentCloseD');
          }
          else{
            this.renderer.removeClass(sideBar, 'closeD');
            this.renderer.removeClass(contentClose, 'contentCloseD');
          }
      }
    }
  }




}
