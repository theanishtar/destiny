import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import '../../assets/toast/main.js';
declare var toast: any;
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {
  private sendMailUrl = environment.baseUrl + 'v1/user/forgotpassword';
  private checkCodelUrl = environment.baseUrl + 'v1/user/sendcode';
  private changePasslUrl = environment.baseUrl + 'v1/user/changepassword';

  constructor(
    private http: HttpClient
  ) { }


  sendMail(data: any) {
    return this.http.post<any>(this.sendMailUrl, data).pipe(
      tap((res) => {
        let data = JSON.stringify(res);
        if (data.substring(2, data.length - 2) == 'success') {
          let timerInterval;
          Swal.fire({
            title: 'Thông báo!',
            html: 'Quá trình sẽ diễn ra trong vài giây!',
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              new toast({
                title: 'Thông báo!',
                message: 'Vui lòng kiểm tra Email',
                type: 'success',
                duration: 3000,
              })
            }
          });
        } else if (data.substring(2, data.length - 2) == 'isExists') {
          new toast({
            title: 'Thông báo!',
            message: 'Mã đã được gửi',
            type: 'info',
            duration: 3000,
          })
        } else {
          new toast({
            title: 'Thất bại!',
            message: 'Email không tồn tại',
            type: 'error',
            duration: 3000,
          })
        }
      }
      ),
      catchError((error) => of([
      ]))
    );
  }

  checkCodeMail(data: any) {
    return this.http.post<any>(this.checkCodelUrl, data).pipe(
      tap((res) => {
        let data = JSON.stringify(res);
        if (data.substring(2, data.length - 2) == 'timeup') {
          new toast({
            title: 'Thất bại!',
            message: 'Mã xác đã hết hiệu lực',
            type: 'error',
            duration: 3000,
          })
        } 
        if (data.substring(2, data.length - 2) == 'wrongcode') {
          new toast({
            title: 'Thất bại!',
            message: 'Mã xác nhận không đúng',
            type: 'error',
            duration: 3000,
          })
        } 
        if (data.substring(2, data.length - 2) == 'success') {
          new toast({
            title: 'Thành công',
            message: 'Xác nhận thành công',
            type: 'success',
            duration: 3000,
          })
        }
      }

      ),
      catchError((error) => of([

      ]))
    );
  }

  changePassword(data: any) {
    return this.http.post<any>(this.changePasslUrl, data).pipe(
      tap((res) => {
        let data = JSON.stringify(res);
        if (data.substring(2, data.length - 2) == 'success') {
          new toast({
            title: 'Thông báo!',
            message: 'Mật khẩu đã được thay đổi',
            type: 'success',
            duration: 3000,
          })
        } else {
          new toast({
            title: 'Thất bại!',
            message: 'Mật khẩu mới trùng với mật khẩu cũ',
            type: 'warning',
            duration: 3000,
          })
        }
      }

      ),
      catchError((error) => of([

      ]))
    );
  }
}
