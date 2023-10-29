import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
//Xử lí bất đồng bộ
import Swal from 'sweetalert2';
import '../../../../../assets/toast/main.js';
declare var toast: any;
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProfileService } from '@app/user/service/profile.service';
@Component({
  selector: 'app-change-confirm',
  templateUrl: './change-confirm.component.html',
  styleUrls: ['./change-confirm.component.css']
})
export class ChangeConfirmComponent {
  code: string | null = '';
  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.code = params.get('code');
      console.log(this.code)
    });
    this.checkCodeMail();
  }

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public profileService: ProfileService,
  ) {
  }
  // checkCodeMail() {
  //     const checkMail = environment.baseUrl + `v1/user/profile/change/email/code=${this.code}`;
  //     // const changeToken = environment.baseUrl + `v1/user/profile/change/email/confirm`;

  //     this.http.get<any>(checkMail).subscribe((res) => {
  //       this.profileService.changeToken(this.code).subscribe(() =>{

  //       })
  //     })
    
  // }
  checkCodeMail() {
    const checkMail = environment.baseUrl + `v1/user/profile/change/email/code=${this.code}`;
    // Gửi yêu cầu HTTP để kiểm tra mã Email
    this.http.get<any>(checkMail).pipe(
      // Sử dụng switchMap để kết hợp yêu cầu kiểm tra Email và yêu cầu thay đổi token
      switchMap((res) => {
        if (res.isValid) {
          // Nếu mã Email hợp lệ, gọi yêu cầu thay đổi token
          return this.profileService.changeToken(this.code);
        } else {
          // Nếu mã Email không hợp lệ, trả về một giá trị observable trống
          return of(null);
        }
      })
    ).subscribe(() => {
      // Xử lý sau khi yêu cầu thay đổi token hoàn thành
    });
  }
}
