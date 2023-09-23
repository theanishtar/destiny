import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import '../../assets/toast/main.js';
declare var toast: any;
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private userURL = 'http://localhost:8080/v1/oauth/register';
  private userCheckCodeMail = `http://localhost:8080/v1/oauth/register/authen/${localStorage.getItem('registerEmail')!}`;

  registerUser(data: any) {
    return this.http.post<any>(this.userURL, data).pipe(
      tap((response) => {
        console.log(`receivedUser = ${JSON.stringify(response)}`);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error.status 2: " + JSON.stringify(error.error.text))
        if (error.status === 200) {
          // console.log("này bên service: " + localStorage.getItem('registerEmail')!);
          this.navigateToWaitConfirm(localStorage.getItem('registerEmail')!);
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
            localStorage.removeItem('registerEmail'),
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
      tap((res) => {
        // receivedUser => console.log(`receivedUser = ${JSON.stringify(receivedUser)}`)
        console.log('Đăng ký xong');
    }),
      catchError((error: HttpErrorResponse) => {
        console.log("error.status 2: " + JSON.stringify(error.error.text))
        if (error.status === 202) {
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

  navigateToWaitConfirm(authregis: string) {
    this.router.navigate(['wait-confirm', authregis]);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      const authregis = params.get('authregis');
      console.log(authregis); // In ra giá trị của authregis từ đường dẫn
    });
  }
}
