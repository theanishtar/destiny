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

import { LoginService } from '../service/login.service';
import { RegisterService } from '@app/service/register.service';
import { FollowsService } from '@app/user/service/follows.service';
import { MessageService } from '@app/user/service/message.service';

import { connectToChat } from '../../assets/js/chat/chat.js'
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
	submitted: boolean = false;
	checkedRemember: boolean = false;
	registerFullname: string = '';
	registerEmail: string = '';
	registerPassword: string = '';
	sender: any[];
	orderby: any;
	userLogGG: any[] = [];
	userGG: any;
	loggedIn: any;

	constructor(
		private formbuilder: FormBuilder,
		public loginService: LoginService,
		private cookieService: CookieService,
		private http: HttpClient,
		private router: Router,
		private route: ActivatedRoute,
		public registerService: RegisterService,
		public followsService: FollowsService,
		public messageService: MessageService
	) {
		this.createFormLogin();
		this.createFormRegister();
	}

	ngOnInit() {
		this.loginWithGG();
		// Giao diện
		tabs.tabs();
		form.formInput();
	}
	/*===========Login with google===============*/
	loginWithGG() {
		this.route.queryParams.subscribe((params) => {
			this.orderby = params['subIdAuthentication'];

			function delay(ms: number) {
				return new Promise(function (resolve) {
					setTimeout(resolve, ms);
				});
			}

			if (this.orderby !== undefined) {
				this.loginService.loginAuth(this.orderby).subscribe((res) => {
					if (res !== undefined) {
						if (res.roles[0].authority == 'ROLE_OWNER' || res.roles[0].authority == 'ROLE_ADMIN' || res.roles[0].authority == 'ROLE_MODERATOR') {
							// let userAdmin = {
							// 	email: res.email,
							// 	password: res.password,
							// };
							// this.logAdmin(userAdmin);
							// window.location.href =
							// 	'http://localhost:8080/oauth/rec/' +
							// 	userAdmin.email +
							// 	'/' +
							// 	userAdmin.password;
							// this.loginForm.reset();
							window.location.href = 'http://localhost:4200/admin';
							this.loginForm.reset();
						} else {
							this.userLogGG = JSON.parse(JSON.stringify(res));
							this.setUserLogGG(this.userLogGG);
							localStorage.setItem(
								'token',
								JSON.parse(JSON.stringify(this.getUserLogGG())).token
							);
							this.cookieService.set('full_name', res.name);
							this.cookieService.set('role', res.roles[0].authority);

							this.router.navigate(['newsfeed']);
							new toast({
								title: 'Thành công!',
								message: 'Đăng nhập thành công!',
								type: 'success',
								duration: 2000,
							});

							// delay(2000).then((res) => {
							// 	location.reload();
							// });
						}
					}
				});
			}
		});
	}


	// Getter
	getUserLogGG(): any[] {
		return this.userLogGG;
	}

	//   Setter
	setUserLogGG(data: any[]): void {
		this.userLogGG = data;
	}

	loginGGClick() {
		window.location.href = 'https://accounts.google.com/gsi/select?client_id=829042615252-9cgbgmdc55famceanr15b20dq3kns76m&ux_mode=redirect&login_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth%2FloginGG&ui_mode=card&as=tpphk8oJS9SGuKAiUmVKtg&g_csrf_token=2a42f6fd54be8af1&origin=http%3A%2F%2Flocalhost%3A4200';
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
			this.submitted = true;
			this.loginService.loginUser(this.loginForm.value).subscribe((response) => {
				function delay(ms: number) {
					return new Promise(function (resolve) {
						setTimeout(resolve, ms);
					});
				}
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
					if (response.roles[0].authority == 'ROLE_OWNER' || response.roles[0].authority == 'ROLE_ADMIN' || response.roles[0].authority == 'ROLE_MODERATOR') {
						// let userAdmin = {
						// 	email: this.loginForm.get('email')!.value,
						// 	password: this.loginForm.get('password')!.value,
						// };
						// this.logAdmin(userAdmin);
						// window.location.href =
						// 	'http://localhost:8080/oauth/rec/' +
						// 	userAdmin.email +
						// 	'/' +
						// 	userAdmin.password;
						this.cookieService.set('full_name', response.name);
						this.cookieService.set('role', response.roles[0].authority);
						window.location.href = 'http://localhost:4200/admin';
						this.loginForm.reset();
					} else {
						this.cookieService.set('full_name', response.name);
						this.cookieService.set('role', response.roles[0].authority);

						this.loginForm.reset();
						this.router.navigate(['newsfeed']);
						new toast({
							title: 'Thành công!',
							message: 'Đăng nhập thành công',
							type: 'success',
							duration: 1500,
						});
						delay(100).then((res) => {
							location.reload();
						});
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
		const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{4,20}$/;
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
					console.log("Check")
				}
			});
		} else {
			new toast({
				title: 'Thất bại!',
				message: 'Vui lòng kiểm tra lại xác nhận mật khẩu!',
				type: 'error',
				duration: 2000,
			});
		}
		let timerInterval;
		Swal.fire({
			title: 'Thông báo!',
			html: 'Quá trình sẽ diễn ra trong vài giây!',
			timer: 16000,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading();
			},
			willClose: () => {
				clearInterval(timerInterval);
			},
		}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {
				console.log('I was closed by the timer');
			}
		});
	}


	/*============Message==============*/
	// loadDataSender() {
	// 	this.messageService.loadDataListChat().subscribe(() => {
	// 	  this.sender = JSON.parse(JSON.stringify(this.messageService.getDataChat()));
	// 	  console.log("this.sender: " + this.sender);
	// 	  connectToChat(this.sender);
	// 	});
	// }


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
