import { Component, OnInit } from '@angular/core';
// Import tệp JS của giao diện
import 'src/assets/js/utils/svg-loader.js';
import { form } from '../../assets/js/form/form.utils.js';
import { tabs } from '../../assets/js/landing/landing.tabs.js';

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
    `../css/vendor/bootstrap.min.css`,
    `../css/styles.min.css`,
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit{
  public loginForm!: FormGroup;

  constructor(
		private formbuilder: FormBuilder,
	) {
	}

  ngOnInit() {

    // Giao diện
    tabs.tabs();
    form.formInput();
  }

  createFormLogin() {
		this.loginForm = this.formbuilder.group({
			email: [''],
			password: [''],
		});
	}

	get loginFormControl() {
		return this.loginForm.controls;
	}

  loginWithEmailAndPassword() {
  }
}
