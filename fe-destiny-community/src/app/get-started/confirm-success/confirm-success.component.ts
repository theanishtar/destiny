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
      this.registerService.registerCode = this.registerCode;
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
    })
  }
}
