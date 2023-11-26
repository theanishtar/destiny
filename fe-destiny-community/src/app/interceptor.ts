import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
// import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginService } from './service/login.service';
import { tap } from 'rxjs/operators';

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
        if (
            request.url.includes('/v1/oauth/login') ||
            request.url.includes('/v1/oauth/register') ||
            request.url.includes('/v1/oauth/login/oauh2') ||
            request.url.includes('/v1/jwt/get') ||
            request.url.includes('/v1/user/logout/chat/' + this.idUser)
        ) {
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

        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 401 || error.status === 0) {
                    // Nếu là lỗi 401, thử lấy token mới
                    return this.loginService.refreshToken().pipe(
                        switchMap(() => {
                            // Sau khi refreshToken() hoàn thành, tiếp tục với xử lý của yêu cầu gốc
                            const newRequest = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                            });
                            return next.handle(newRequest);
                        })
                    );
                } else {
                    // Nếu không phải lỗi 401, đẩy lỗi lên để xử lý ở phía trên
                    return throwError(error);
                }
            })
        );
    }
}