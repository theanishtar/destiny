import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UIServiveService } from '@app/user/service/ui-servive.service';
import { ProfileService } from '@app/user/service/profile.service';
import { MessageService } from '@app/user/service/message.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import '../../assets/toast/main.js';
declare var toast: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    `../css/item/vikinger-fonts-css.css`,
    `../css/item/element.css`,

  ]
})
export class HomeComponent implements OnInit{
  slideIndex: number = 1;
  slidesLength: string;

  ngOnInit() {
    this.uiServiveService.loadMode();
    this.autoLogin();
  }
  
  constructor(
    public uiServiveService: UIServiveService,
    private profileService: ProfileService,
    private messageService: MessageService,
    private router: Router,
    private cookieService: CookieService,
  ){}
  
  autoLogin(){
    let token = localStorage.getItem('token');
    // console.warn("this.messageService.checkError: " + this.messageService.checkError);
    if(token !== null && this.messageService.checkError && this.cookieService.get('role') === 'ROLE_USER'){
      window.location.href = environment.baseUrlFe + 'newsfeed';
    }else if(token !== null && this.messageService.checkError && this.cookieService.get('role') === 'ROLE_ADMIN'){
      window.location.href = environment.baseUrlFe + 'admin';
    }else if(token !== null && this.messageService.checkError && this.cookieService.get('role') === 'ROLE_MODERATOR'){
      window.location.href = environment.baseUrlFe + 'moderator/forbidden-word';
    }else if(token !== null && this.messageService.checkError && this.cookieService.get('role') === 'ROLE_OWNER'){
      window.location.href = environment.baseUrlFe + 'owner';
    }else if(token !== null && !this.messageService.checkError){
      this.router.navigate(['login']);
      new toast({
        title: 'Phiên đăng nhập của bạn đã hết hạn!',
        message: 'Vui lòng đăng nhập lại',
        type: 'warning',
        duration: 3000,
    });
    }
  }

  // Next/previous controls
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n: number) {
    let i: number;
    let slides: HTMLCollectionOf<Element> = document.getElementsByClassName("swiper-slide");
    this.slidesLength = slides.length.toString();
    // Kiểm tra nếu slideIndex vượt quá giới hạn
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }

    // Ẩn tất cả các slides
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
    }
    // Kiểm tra slideIndex có hợp lệ trước khi hiển thị slide và dot tương ứng
    if (this.slideIndex >= 1 && this.slideIndex <= slides.length) {
      (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
    }
  }
}
