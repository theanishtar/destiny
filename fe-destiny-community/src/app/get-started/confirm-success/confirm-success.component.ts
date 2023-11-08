import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

//Xử lí bất đồng bộ
import Swal from 'sweetalert2';
import '../../../assets/toast/main.js';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ActivatedRoute, ParamMap } from '@angular/router';
declare var toast: any;

import { RegisterService } from '@app/service/register.service';
import { LoginService } from '@app/service/login.service';
import { environment } from '../../../environments/environment';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
@Component({
  selector: 'app-confirm-success',
  templateUrl: './confirm-success.component.html',
  styleUrls: ['./confirm-success.component.css']
})
export class ConfirmSuccessComponent {
  registerEmail: string | null = '';
  registerCode: string | null = '';
  socket?: WebSocket;
  stompClient?: Stomp.Client;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.registerCode = params.get('authcode');
      console.log(this.registerCode);
      this.registerService.registerCode = this.registerCode;
      console.log(" this.registerService.registerCode: " +  this.registerService.registerCode);
      // this.connected(this.registerCode);
    });
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
    this.registerService.checkCodeMail().subscribe((res) => {
      // const userLogin = environment.baseUrl + `v1/oauth/login/authcode/${this.registerCode}/${res.email}`;

      

      // Swal.fire({
      //   title:
      //     "<p style='color:red; font-size=10px'>Bạn có muốn đăng nhập với tài khoản có email " +
      //     res.email +
      //     ' không?</p>',
      //   showCancelButton: true,
      //   confirmButtonColor: '#d33',
      //   cancelButtonColor: '#3085d6',
      //   confirmButtonText: 'Có',
      //   cancelButtonText: 'Không',
      //   allowOutsideClick: false,
      // }).then((result) => {
      //   if (result.value) {
      //     this.http.get<any>(userLogin).subscribe((res) => {
      //       function delay(ms: number) {
      //         return new Promise(function (resolve) {
      //           setTimeout(resolve, ms);
      //         });
      //       }
      //       this.cookieService.set('full_name', res.name);
      //       localStorage.setItem(
      //         'token',
      //         res.token
      //       );
      //       this.cookieService.set('avatar', res.avatar);
      //       this.cookieService.set('id', res.id);
      //       this.cookieService.set('role', res.roles[0].authority);
      //       delay(500).then((res) => {
      //         this.router.navigate(['newsfeed']);
      //         new toast({
      //           title: 'Thành công!',
      //           message: 'Đăng nhập thành công',
      //           type: 'success',
      //           duration: 2000,
      //         });
      //       });
      //     },
      //       (error: HttpErrorResponse) => {
      //         if (error.status === 404) {
      //           new toast({
      //             title: 'Thất bại!',
      //             message: 'Không tìm thấy tài khoản',
      //             type: 'error',
      //             duration: 3000,
      //           })
      //         } else if (error.status === 401) {
      //           new toast({
      //             title: 'Phiên đăng nhập đã hết hạn!',
      //             message: 'Vui lòng đăng nhập thủ công!',
      //             type: 'info',
      //             duration: 3000,
      //           })
      //         } else {
      //           new toast({
      //             title: 'Server hiện không hoạt động!',
      //             message: 'Vui lòng quay lại sau, DaviTickets chân thành xin lỗi vì bất tiện này!',
      //             type: 'warning',
      //             duration: 3000,
      //           })
      //         }
      //         this.router.navigate(['get-started']);
      //       }
      //     );
      //   } else {
      //     new toast({
      //       title: 'Thành công!',
      //       message: 'Đăng ký thành công',
      //       type: 'success',
      //       duration: 3000,
      //     });
      //     this.router.navigate(['home']);
      //   }
      // });
    })
  }
  // connected(code) {
  //   this.socket = new SockJS(environment.baseUrl + 'confirm-registe');
  //   this.stompClient = Stomp.over(this.socket!);
  //   this.stompClient.connect({}, (frame) => {
  //     this.stompClient?.subscribe("/topic/autologin/" + code, (response) => {
  //       let data = JSON.parse(response.body);
  //       const userLogin = environment.baseUrl + `v1/oauth/login/authcode/${this.registerCode}/${data.email}`;
  //     });
  //   })
  // }
}
