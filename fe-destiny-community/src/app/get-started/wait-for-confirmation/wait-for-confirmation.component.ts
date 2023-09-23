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
import { ActivatedRoute } from '@angular/router';
declare var toast: any;

import { RegisterService } from '@app/service/register.service';

@Component({
  selector: 'app-wait-for-confirmation',
  templateUrl: './wait-for-confirmation.component.html',
  styleUrls: ['./wait-for-confirmation.component.css']
})
export class WaitForConfirmationComponent {
  
  ngOnInit() {
    
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

  verification(){
    this.checkCodeMail();
  }

  checkCodeMail(){
    this.registerService.checkCodeMail().subscribe((res) => {
      if(res == ''){
        new toast({
          title: 'Thất bại!',
          message: 'Xác thực thất bạn!',
          type: 'error',
          duration: 5000,
        });
      }else{
        new toast({
          title: 'Thành công!',
          message: 'Đăng ký thành công',
          type: 'success',
          duration: 3000,
        });
        localStorage.removeItem('registerEmail');
        this.router.navigate(['get-started']);
      }
    })
  }
}
