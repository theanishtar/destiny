import { Component, OnInit } from '@angular/core';
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
import '../../../assets/toast/main.js';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ActivatedRoute, Params } from '@angular/router';
declare var toast: any;

import { RegisterService } from '@app/service/register.service';
import { LoginService } from '@app/service/login.service';
@Component({
  selector: 'app-confirm-success',
  templateUrl: './confirm-success.component.html',
  styleUrls: ['./confirm-success.component.css']
})
export class ConfirmSuccessComponent {
  ngOnInit() {
    this.checkCodeMail();
  }

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public registerService: RegisterService,
  ) {
  }

  checkCodeMail() {
    this.registerService.checkCodeMail().subscribe(() => {
        Swal.fire({
          title:
            "<p style='color:red; font-size=10px'>Bạn có muốn đăng nhập với tài khoản có email " +
            localStorage.getItem("registerEmail") +
            ' không?</p>',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Có',
          cancelButtonText: 'Không',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.value) {
            var data = {
              email: localStorage.getItem("registerEmail"),
              password: localStorage.getItem("registerPass"),
            };
            this.loginService.loginUser(data).subscribe((res) => {
              function delay(ms: number) {
                return new Promise(function (resolve) {
                  setTimeout(resolve, ms);
                });
              }
              if (res == '') {
                new toast({
                  title: 'Thất bại!',
                  message: 'Email hoặc mật khẩu không đúng!',
                  type: 'error',
                  duration: 5000,
                });
              } else {
                this.cookieService.set('full_name', res.name);
                delay(500).then((res) => {
                  this.router.navigate(['newsfeed']);
                  new toast({
                    title: 'Thành công!',
                    message: 'Đăng nhập thành công',
                    type: 'success',
                    duration: 1500,
                  });
                });
              }
            });
          } else {
            new toast({
              title: 'Thành công!',
              message: 'Đăng ký thành công',
              type: 'success',
              duration: 3000,
            });
            this.router.navigate(['home']);
          }
          localStorage.removeItem("registerEmail");
          localStorage.removeItem("registerPass");
        });
    })
  }
}
