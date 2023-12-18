import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse,
    HttpHeaders
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError, from } from 'rxjs';
// import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginService } from './service/login.service';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment'
import { axios } from '../assets/js/axios.js'
import '../assets/toast/main.js';
declare var toast: any;
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    idUser: any = this.cookieService.get('id');

    constructor(
        private loginService: LoginService,
        private cookieService: CookieService,
    ) { 
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            request.url.includes('/v1/oauth/login') ||
            request.url.includes('/v1/oauth/register') ||
            request.url.includes('/v1/oauth/login/oauh2') ||
            request.url.includes('/v1/jwt/get') ||
            request.url.includes('/v1/login/qr/web') ||
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

                    
                    // Nếu là lỗi 401, thử lấy token mới
                    // return this.loginService.getNewToken().pipe(
                    //     switchMap((newToken) => { // Receive the new token here
                    //     // Sau khi refreshToken() hoàn thành, tiếp tục với xử lý của yêu cầu gốc
                    //     const newRequest = request.clone({
                    //         setHeaders: {
                    //         Authorization: `Bearer ${newToken}`, // Use the new token
                    //         },
                    //     });
                    //     return next.handle(newRequest);
                    //     }),
                    //     catchError((refreshError) => {
                    //     // Handle errors that might occur during the token refresh
                    //     // You might want to log the error or perform other actions
                    //     console.error('Error refreshing token:', refreshError);
                    //     return throwError(refreshError);
                    //     })
                    // );
        // return next.handle(request).pipe(
        //     catchError((error) => {
        //         if (error.status === 401 || error.status === 0) {
        //             return from(this.loginService.getNewToken()).pipe(
        //               switchMap((result) => {
        //                 console.log('result: ' + result);
        //                 const newRequest = request.clone({
        //                   setHeaders: {
        //                     Authorization: `Bearer ${result.token}`, // Use the new token
        //                   },
        //                 });
        //                 return next.handle(newRequest);
        //               }),
        //               catchError((refreshError) => {
        //                 console.log("ERR 401")
        //                 console.error(refreshError);
        //                 return throwError(refreshError); // Propagate the error
        //               })
        //             );
        //         } else {
        //             // Nếu không phải lỗi 401, đẩy lỗi lên để xử lý ở phía trên
        //             return throwError(error);
        //         }
        //     })
        // );
        return next.handle(request).pipe();
    }
}