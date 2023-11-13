import { Injectable } from '@angular/core';
//Xử lí bất đồng bộ
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '@app/user/service/message.service';
import Swal from 'sweetalert2';
import '../../assets/toast/main.js';
declare var toast: any;

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private userURL = environment.baseUrl + 'v1/oauth/login';
	private userLoginAuth = environment.baseUrl + 'v1/oauth/login/oauh2';
	private userLogout = environment.baseUrl + 'v1/user/logoutchat';

	private userLogined: any[] = [];
	userLogGG: any[] = [];

	loginUser(data: any): Observable<any> {
		return this.http.post<any>(this.userURL, data)
			.pipe(
				tap((response) => {
					this.userLogined = JSON.parse(JSON.stringify(response));
					this.setUserLog(this.userLogined);
					localStorage.setItem(
						'token',
						JSON.parse(JSON.stringify(this.getUserLog())).token
					);
					this.cookieService.set('full_name', response.name);
					this.cookieService.set('avatar', response.avatar);
					this.cookieService.set('id', response.id);
					this.cookieService.set('role', response.roles[0].authority);
					// this.cookieService.set('role', JSON.parse(JSON.stringify(this.getUserLog())).roles[0].authority);
				}),
				catchError((error: HttpErrorResponse) => {
					console.log("error.status: " + error.status)
					if (error.status === 200) {
						return [];
					} else if (error.status === 404) {
						return throwError(
							new toast({
								title: 'Thất bại!',
								message: 'Tài khoản không tồn tại',
								type: 'error',
								duration: 1500,
							})
						);
					} else if (error.status === 403) {
						return throwError(
							new toast({
								title: 'Tài khoản của bạn đã bị khóa!',
								message: 'Vui lòng liên hệ admin để được hỗ trợ!',
								type: 'error',
								duration: 1500,
							})
						);
					} else if (error.status === 429) {
						return throwError(
							new toast({
								title: 'Vui lòng quay lại sau 1 phút nữa!',
								message: "Tài khoản đã bị tạm khóa quá tải yêu cầu",
								type: 'warning',
								duration: 1500,
							})
						);
					} else if (error.status === 401) {
						return throwError(
							new toast({
								title: 'Thất bại!',
								message: 'Vui lòng kiểm tra lại thông tin đăng nhập',
								type: 'error',
								duration: 1500,
							})
						);
					}
					else {
						// Handle other errors
						return throwError(
							new toast({
								title: 'Server hiện không hoạt động!',
								message: 'Vui lòng quay lại sau, Destiny chân thành xin lỗi vì bất tiện này!',
								type: 'warning',
								duration: 3000,
							})
						);
					}
				})
			);
	}

	loginWithGG(token: string, type: string): Observable<any> {
		const params = new HttpParams({ fromObject: { token: token, type: type } });
		return this.http.get<any>(this.userLoginAuth, { params: params }).pipe(
			tap((res) => {
				this.setUserLogGG(JSON.parse(JSON.stringify(res)));
				localStorage.setItem(
					'token',
					JSON.parse(JSON.stringify(this.getUserLogGG())).token
				);
				this.cookieService.set('full_name', res.name);
				this.cookieService.set('avatar', res.avatar);
				this.cookieService.set('id', res.id);
				this.cookieService.set('role', res.roles[0].authority);

			})
		);
	}

	constructor(
		private http: HttpClient,
		private cookieService: CookieService,
		private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient,
		private messageService: MessageService
	) { }

	isLogin(): boolean {
		if (this.cookieService.get('full_name') == '') {
			return false;
		}
		return true;
	}
	sender: any;
	logout(): void {
		function delay(ms: number) {
			return new Promise(function (resolve) {
				setTimeout(resolve, ms);
			});
		}
		Swal.fire({
			title: 'Bạn muốn đăng xuất?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.value) {
				this.http.get<any>(this.userLogout).subscribe(() => {
					this.router.navigate(['home']);
					this.cookieService.deleteAll();
					localStorage.clear();
					this.messageService.logout();
					new toast({
						title: 'Đã đăng xuất!',
						message: 'Hẹn gặp lại',
						type: 'warning',
						duration: 2000,
					});
				})
			} else {
				new toast({
					title: 'Lỗi!',
					message: 'Vui lòng chờ',
					type: 'warning',
					duration: 2000,
				});
			}

			// });
		});
	}

	// Getter
	getUserLog(): any[] {
		return this.userLogined;
	}

	//   Setter
	setUserLog(data: any[]): void {
		this.userLogined = data;
	}


	// Getter
	getUserLogGG(): any[] {
		return this.userLogGG;
	}

	//   Setter
	setUserLogGG(data: any[]): void {
		this.userLogGG = data;
	}
}
