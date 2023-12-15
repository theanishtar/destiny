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

  checkLoading: boolean = false;
  constructor(
    private http: HttpClient
  ) { }


  sendMail(data: any) {
    return this.http.post<any>(this.sendMailUrl, data).pipe(
      tap((res) => {
        let data = JSON.stringify(res);
        if (data.substring(2, data.length - 2) == 'success') {
          this.checkLoading = false;
          new toast({
            title: 'Thông báo!',
            message: 'Vui lòng kiểm tra Email',
            type: 'success',
            duration: 3000,
          });
        } else if (data.substring(2, data.length - 2) == 'isExists') {
          this.checkLoading = false;
          new toast({
            title: 'Thông báo!',
            message: 'Mã đã được gửi',
            type: 'info',
            duration: 3000,
          })
        } else {
          this.checkLoading = false;
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
          this.checkLoading = false;
          new toast({
            title: 'Thất bại!',
            message: 'Mã xác đã hết hiệu lực',
            type: 'error',
            duration: 3000,
          })
        }
        if (data.substring(2, data.length - 2) == 'wrongcode') {
          this.checkLoading = false;
          new toast({
            title: 'Thất bại!',
            message: 'Mã xác nhận không đúng',
            type: 'error',
            duration: 3000,
          })
        }
        if (data.substring(2, data.length - 2) == 'success') {
          this.checkLoading = false;
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
          this.checkLoading = false;
          new toast({
            title: 'Thông báo!',
            message: 'Mật khẩu đã được thay đổi',
            type: 'success',
            duration: 3000,
          })
        } else {
          this.checkLoading = false;
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
