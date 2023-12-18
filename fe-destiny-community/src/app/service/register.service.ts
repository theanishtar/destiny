import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import '../../assets/toast/main.js';
declare var toast: any;
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public registerCode: any;
  private userURL = environment.baseUrl + 'v1/oauth/register';
  private userCheckCodeMail = environment.baseUrl + 'v1/oauth/register/authen/';

  private userLogined: any[] = [];
  socket?: WebSocket;
  stompClient?: Stomp.Client;

  email: string;
  registerUser(data: any) {
    return this.http.post<any>(this.userURL, data).pipe(
      tap((response) => {
        this.email = response.email;
        // console.log(`receivedUser = ${JSON.stringify(response)}`);
      }),
      catchError((error: HttpErrorResponse) => {
        // console.log("error.status 2: " + JSON.stringify(error))
        if (error.status === 200) {
          this.loginService.checkLog = false;
          this.router.navigate(['wait-confirm']);
          return throwError(
            new toast({
              title: 'Thông báo!',
              message: 'Vui lòng kiểm tra Email',
              type: 'success',
              duration: 3000,
            })
          );
        } else if (error.status === 202) {
          this.loginService.checkLog = false;
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Email đã tồn tại',
              type: 'error',
              duration: 1500,
            }),
          );
        } else {
          this.loginService.checkLog = false;
          return throwError(
            new toast({
              title: 'Server hiện không hoạt động!',
              message: 'Vui lòng quay lại sau, DaviTickets chân thành xin lỗi vì bất tiện này!',
              type: 'warning',
              duration: 1500,
            })
          );
        }
      })
    );
  }

  checkCodeMail() {
    return this.http.get<any>(this.userCheckCodeMail+this.registerCode).pipe(
      tap((response) => {
        // console.log(`đăng ký = ${JSON.stringify(response)}`);
        if(response === null){
          new toast({
            title: 'Mã xác nhận đã hết hạn!',
            message: 'Vui lòng tiến hành tạo lại tài khoản',
            type: 'info',
            duration: 3000,
          });
          this.router.navigate(['get-started']);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // console.log("error.status 2: " + JSON.stringify(error.error.text))
        if (error.status === 202) {
          this.router.navigate(['get-started']);
          return throwError(
            new toast({
              title: 'Thông báo!',
              message: 'Xác thực thành công',
              type: 'success',
              duration: 3000,
            })
          );
        } else {
          return throwError(
            new toast({
              title: 'Server hiện không hoạt động!',
              message: 'Vui lòng quay lại sau, DaviTickets chân thành xin lỗi vì bất tiện này!',
              type: 'warning',
              duration: 1500,
            })
          );
        }
      })
    );
  }

  connected(email) {
    this.socket = new SockJS(environment.baseUrl + 'confirm-register');
    this.stompClient = Stomp.over(this.socket!);
    this.stompClient.connect({}, (frame) => {
      console.warn("frame: " + frame);
      this.stompClient?.subscribe("/topic/autologin/" + email, (response) => {
        let data = JSON.parse(response.body);
        const userLogin = environment.baseUrl + `v1/oauth/login/authcode/${data.code}/${data.email}`;
        this.http.get<any>(userLogin).subscribe((res) => {
          function delay(ms: number) {
            return new Promise(function (resolve) {
              setTimeout(resolve, ms);
            });
          }
          this.cookieService.set('full_name', res.name);
          localStorage.setItem(
            'token',
            res.token
          );
          this.cookieService.set('avatar', res.avatar);
          this.cookieService.set('id', res.id);
          this.cookieService.set('role', res.roles[0].authority);
          delay(500).then((res) => {
            window.location.href = environment.baseUrlFe + 'newsfeed';
          });
        });
      });
    })
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public loginService: LoginService,
    private cookieService: CookieService,
  ) {

  }
}
