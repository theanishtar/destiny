import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor() { }

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
	}
}