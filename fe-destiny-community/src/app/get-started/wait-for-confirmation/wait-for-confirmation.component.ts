import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

//Xử lí bất đồng bộ
import '../../../assets/toast/main.js';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ActivatedRoute, Params } from '@angular/router';
declare var toast: any;

import { RegisterService } from '@app/service/register.service';

@Component({
  selector: 'app-wait-for-confirmation',
  templateUrl: './wait-for-confirmation.component.html',
  styleUrls: ['./wait-for-confirmation.component.css']
})
export class WaitForConfirmationComponent {

  ngOnInit() {
    // this.checkCodeMail();
    // this.startCountdown();
  }

  constructor(
    private formbuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public registerService: RegisterService,
  ) {
  }

  // startCountdown() {
  //   const countdownElement = document.getElementById('countdown') as HTMLDivElement;

  //   let countdownInterval: number;
  //   let timeLeft = 300; // 5 phút

  //   function formatTime(seconds: number): string {
  //     const minutes = Math.floor(seconds / 60);
  //     const remainingSeconds = seconds % 60;
  //     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  //   }

  //   function updateCountdown() {
  //     countdownElement.innerText = formatTime(timeLeft);

  //     if (timeLeft <= 0) {
  //       clearInterval(countdownInterval);
  //       // countdownElement.innerText = 'Hết giờ!';
  //       new toast({
  //         title: 'Xác thực thất bại!',
  //         message: 'Sẽ chuyển trang sau 3 giây',
  //         type: 'error',
  //         duration: 3000,
  //       });
  //       // Chuyển đến trang khác sau khi hết giờ
  //       setTimeout(() => {
  //         window.location.href = 'home';
  //       }, 3000);
  //     }

  //     timeLeft--;
  //   }

  //   updateCountdown();
  //   countdownInterval = window.setInterval(updateCountdown, 1000);
  // }
}
