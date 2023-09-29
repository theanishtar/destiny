import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import '../../assets/toast/main.js';
declare var toast: any;
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private userURL = 'http://localhost:8080/v1/oauth/register';
  private userCheckCodeMail = 'http://localhost:8080/v1/oauth/register/authen/codeMail';

  authCode: string;
  
  registerUser(data: any) {
    return this.http.post<any>(this.userURL, data).pipe(
      tap((response) => {
        console.log(`receivedUser = ${JSON.stringify(response)}`);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error.status 2: " + JSON.stringify(error.error.text))
        if (error.status === 200) {
          this.router.navigate(['wait-confirm']);
          return throwError(
            new toast({
              title: 'Thông báo!',
              message: error.error.text,
              type: 'success',
              duration: 3000,
            })
          );
          // return [];
        } else if (error.status === 202) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: error.error.text,
              type: 'error',
              duration: 1500,
            }),
          );
        } else {
          // Handle other errors
          return throwError(
            localStorage.removeItem('registerEmail'),
            new toast({
              title: 'Server hiện không hoạt động!',
              message: 'Vui lòng quay lại sau, DaviTickets chân thành xin lỗi vì bất tiện này!',
              type: 'warning',
              duration: 1500,
            })
          );
        }
      })
    );
  }

  checkCodeMail() {
    return this.http.get<any>(this.userCheckCodeMail).pipe(
      tap((response) => {
        console.log(`đăng ký = ${JSON.stringify(response)}`);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error.status 2: " + JSON.stringify(error.error.text))
        if (error.status === 202) {
          this.router.navigate(['get-started']);
          return throwError( 
            new toast({
              title: 'Thông báo!',
              message: 'Xác thực thành công',
              type: 'success',
              duration: 3000,
            })
          );
          // return [];
        } else {
          // Handle other errors
          return throwError(
            new toast({
              title: 'Server hiện không hoạt động!',
              message: 'Vui lòng quay lại sau, DaviTickets chân thành xin lỗi vì bất tiện này!',
              type: 'warning',
              duration: 1500,
            })
          );
        }
      })
		);
  }

  redirectToAuthRegistration(authCode: string) {
    this.router.navigate(['/regisauth'], { queryParams: { authcode: authCode } });
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }
}
