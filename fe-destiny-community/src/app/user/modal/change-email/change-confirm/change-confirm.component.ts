import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { switchMap } from 'rxjs/operators';
import { async, of } from 'rxjs';
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
    // setTimeout(() => {
      this.checkCodeMail();
    // }, 5000);
  }

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public profileService: ProfileService,
  ) {
  }

  checkCodeMail() {
    if (this.code !== null) {
      this.profileService.changeToken(this.code).subscribe(() => {
        // this.router.navigate(['setting']);
        // new toast({
        //   title: 'Thông báo!',
        //   message: 'Email đã được thay đổi vui lòng kiểm tra lại tài khoản',
        //   type: 'success',
        //   duration: 3000,
        // })
      });
    }
  }
}
