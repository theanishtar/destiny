import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { delay, catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

//Xử lí bất đồng bộ
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import '../../assets/toast/main.js';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ActivatedRoute } from '@angular/router';
declare var toast: any;

import { LoginService } from '../service/login.service';
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
