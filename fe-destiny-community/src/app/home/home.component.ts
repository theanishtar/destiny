import { Component, OnInit } from '@angular/core';

import { UIServiveService } from '@app/user/service/ui-servive.service';
import { environment } from 'src/environments/environment';
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
    // this.autoLogin();
  }
  
  constructor(
    public uiServiveService: UIServiveService
  ){}
  
  autoLogin(){
    let token = localStorage.getItem('token');
    if(token !== null){
      window.location.href = environment.baseUrlFe + 'newsfeed';
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
