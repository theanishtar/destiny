import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
// import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginService } from './service/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	idUser: any = this.cookieService.get('id');

	constructor(
		private loginService: LoginService,
		private cookieService: CookieService,
	) { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (request.url.includes('/v1/oauth/login')) {
			return next.handle(request);
		}

		if (request.url.includes('/v1/oauth/register')) {
			return next.handle(request);
		}

		if (request.url.includes('/v1/oauth/login/oauh2')) {
			return next.handle(request);
		}
		if (request.url.includes('/v1/jwt/get')) {
			return next.handle(request);
		}
		
		if (request.url.includes('/v1/user/logout/chat/' + this.idUser)) {
			return next.handle(request);
		}
		// Lấy token từ AuthService
		const token = localStorage.getItem('token') || null;

		// Kiểm tra xem token có tồn tại không và thêm token vào header nếu có
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
		}
		return next.handle(request);
		// return next.handle(request).pipe(
		// 	catchError((error: HttpErrorResponse) => {
		// 		console.log('hello1: ' +  JSON.stringify(error));
		// 		console.log('hello1: ' +  error.status);
		// 		// localStorage.setItem(
		// 		// 	'token',
		// 		// 	''
		// 		// );
		// 		if (error.status === 401) {
		// 			console.log('hello2');
		// 			// Token hết hạn, thực hiện lấy token mới
		// 			return this.loginService.refreshToken().pipe(
		// 				switchMap((res) => {
		// 					console.log('hello3');
		// 					localStorage.setItem(
		// 						'token',
		// 						res.token
		// 					);
		// 					// Nếu lấy token mới thành công, thêm token mới vào request và thực hiện lại request
		// 					request = request.clone({
		// 						setHeaders: {
		// 							Authorization: `Bearer ${token}`
		// 						}
		// 					});
		// 					return next.handle(request);
		// 				}),
		// 				catchError((refreshError) => {
		// 					// Xử lý lỗi khi không thể lấy token mới (ví dụ: refresh token hết hạn)
		// 					this.loginService.logout(); // Đăng xuất người dùng hoặc thực hiện các xử lý khác
		// 					return throwError(refreshError);
		// 				})
		// 			);
		// 		}
		// 		return throwError(error);
		// 	})
		// );


	}
}