import { Component, OnInit } from '@angular/core';
// Import tệp JS của giao diện
import 'src/assets/js/utils/svg-loader.js';
import { form } from '../../assets/js/form/form.utils.js';
import { tabs } from '../../assets/js/landing/landing.tabs.js';

import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
//Xử lí bất đồng bộ
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import '../../assets/toast/main.js';
import { ActivatedRoute } from '@angular/router';
declare var toast: any;
import { HttpParams } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { RegisterService } from '@app/service/register.service';
import { FollowsService } from '@app/user/service/follows.service';
import { MessageService } from '@app/user/service/message.service';
import { UIServiveService } from '@app/user/service/ui-servive.service';
import { ReportService } from '@app/user/service/report.service';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-get-started',
	templateUrl: './get-started.component.html',
	styleUrls: [
		`../css/vendor/bootstrap.min.css`,
		`../css/styles.min.css`,
		'./get-started.component.css'
	]
})
export class GetStartedComponent implements OnInit {
	public loginForm!: FormGroup;
	public registerForm!: FormGroup;
	private loginAdmin = '';
	submittedLog: boolean = false;
	submittedRegis: boolean = false;
	checkedRemember: boolean = false;
	registerFullname: string = '';
	registerEmail: string = '';
	registerPassword: string = '';
	sender: any[];
	token: any;
	type: any;
	// userLogGG: any[] = [];
	userGG: any;
	loggedIn: any;
	public loginGGUrl = environment.googleLoginUrl;

	constructor(
		private formbuilder: FormBuilder,
		public loginService: LoginService,
		private cookieService: CookieService,
		private http: HttpClient,
		private router: Router,
		private route: ActivatedRoute,
		public registerService: RegisterService,
		public followsService: FollowsService,
		public messageService: MessageService,
		private uiServiveService: UIServiveService,
		public reportService: ReportService
	) {
		this.createFormLogin();
		this.createFormRegister();
		this.token = this.route.snapshot.queryParamMap.get('token')!;
		this.type = this.route.snapshot.queryParamMap.get('type')!;

	}

	ngOnInit() {
		this.loginWithGG();
		// Giao diện
		tabs.tabs();
		form.formInput();
		this.uiServiveService.loadMode();
	}

	/*===========Login with google===============*/
	loginWithGG() {
		if (this.token != null && this.type != null) {
			// this.router.navigate(['newsfeed']);
			this.loginService.loginWithGG(this.token, this.type).subscribe((res) => {
				// if (res !== undefined) {
				if (res.roles[0].authority == 'ROLE_ADMIN') {
					window.location.href = environment.baseUrlFe + 'admin';
					this.loginForm.reset();
				} else if (res.roles[0].authority == 'ROLE_MODERATOR') {
					window.location.href = environment.baseUrlFe + 'moderator/forbidden-word';
					this.loginForm.reset();
				} else if (res.roles[0].authority == 'ROLE_OWNER') {
					window.location.href = environment.baseUrlFe + 'owner';
					this.loginForm.reset();
				}else {
					// this.router.navigate(['newsfeed']);
					window.location.href = environment.baseUrlFe + 'newsfeed';

				}
			}, (error) => {
				this.router.navigate(['login']);
				new toast({
					title: 'Thất bại!',
					message: 'Đăng nhập thất bại!',
					type: 'error',
					duration: 2000,
				});
			});
		}
	}

	loginFBClick() {
		window.location.href = environment.baseUrl + 'oauth2/authorization/facebook';
	}

	/*===========Login with email and password===============*/
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
		setTimeout(() => {
			this.loginService.checkLog = true;
			this.submittedLog = true;
			this.loginService.loginUser(this.loginForm.value).subscribe((response) => {

				if (response == '') {
					new toast({
						title: 'Thất bại!',
						message: 'Email hoặc mật khẩu không đúng!',
						type: 'error',
						duration: 5000,
					});
				} else {
					if (
						this.checkedRemember == true &&
						response.roles[0].authority == 'ROLE_USER'
					) {
						this.setCookie('sessionID', response.user.sesionId, 2);
					}
					if (response.roles[0].authority == 'ROLE_ADMIN') {
						window.location.href = 'admin';
						this.loginForm.reset();
					} else if (response.roles[0].authority == 'ROLE_MODERATOR') {
						window.location.href = environment.baseUrlFe + 'moderator/forbidden-word';
						this.loginForm.reset();
					} else if (response.roles[0].authority == 'ROLE_OWNER') {
						window.location.href = environment.baseUrlFe + 'owner';
						this.loginForm.reset();
					}else {
						this.loginForm.reset();
						window.location.href = environment.baseUrlFe + 'newsfeed';
					}
				}
			});
		}, 1000);
	}

	setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}
	logAdmin(data: any) {
		this.http.post<any>(this.loginAdmin, data).pipe(
			tap((receivedUser) =>
				console.log(`receivedUser = ${JSON.stringify(receivedUser)}`)
			),
			catchError((error) => of([]))
		);
	}
	bulk(e) {
		if (e.target.checked == true) {
			this.checkedRemember = true;
		} else {
			this.checkedRemember = false;
		}
	}
	isLogin() {
		return this.loginService.isLogin();
	}
	/*===========Register===============*/
	createFormRegister() {
		const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[\w!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{4,20}$/;
		const NAME_PATTERN = /^[\p{L}\s]+$/u;
		this.registerForm = this.formbuilder.group({
			email: ['', [Validators.required, Validators.email]],
			name: ['',
				[
					Validators.required,
					Validators.pattern(NAME_PATTERN),
				]],
			password: ['',
				[
					Validators.required,
					Validators.pattern(PASSWORD_PATTERN),
				]],
			rePassword: ['', [
				Validators.required,
			]],
		});
	}

	get registerFormControl() {
		return this.registerForm.controls;
	}
	register() {
		this.submittedRegis = true;
		if (this.registerForm.valid) {
			this.loginService.checkLog = true;
			if (this.registerForm.get("password")!.value == this.registerForm.get("rePassword")!.value) {
				var data = {
					email: this.registerForm.get("email")!.value,
					name: this.registerForm.get("name")!.value,
					password: this.registerForm.get("password")!.value,
				};
				this.registerService.registerUser(data).subscribe((response) => {
					if (response == '') {
						new toast({
							title: 'Thất bại!',
							message: 'Tài khoản đã tồn tại!',
							type: 'error',
							duration: 3000,
						});
					} else {
						console.log("Check");
					}
				});
				this.registerService.connected(this.registerForm.get("email")!.value);
			} else {
				this.loginService.checkLog = false;
				new toast({
					title: 'Thất bại!',
					message: 'Vui lòng kiểm tra lại xác nhận mật khẩu!',
					type: 'error',
					duration: 2000,
				});
			}
		}
	}

	/*============Template==============*/
	showHidePassLogin() {
		let input = document.getElementById('passwordForm') as HTMLInputElement;
		// console.log(input!);
		if (input.type === 'password') {
			input.type = 'text';
			document.getElementById('eye')!.className = 'fa-regular fa-eye';
		} else {
			input.type = 'password';
			document.getElementById('eye')!.className = 'fa-regular fa-eye-slash';
		}
	}
	showHidePassRegister() {
		let input2 = document.getElementById('password') as HTMLInputElement;
		let input3 = document.getElementById('rePassword') as HTMLInputElement;
		if (input2.type === 'password' || input2.type === 'password') {
			input2.type = 'text';
			input3.type = 'text';
			document.getElementById('eye2')!.className = 'fa-regular fa-eye';
			document.getElementById('eye3')!.className = 'fa-regular fa-eye';
		} else {
			input2.type = 'password';
			input3.type = 'password';
			document.getElementById('eye2')!.className = 'fa-regular fa-eye-slash';
			document.getElementById('eye3')!.className = 'fa-regular fa-eye-slash';
		}
	}
}
