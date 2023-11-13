import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
declare var toast: any;
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {
  private loadDataBadWordAPI = environment.baseUrl + 'v1/moderator/badwords';
  private addBadWordAPI = environment.baseUrl + 'v1/moderator/addBadword';
  private addBadWordsAPI = environment.baseUrl + 'v1/moderator/addBadwords';
  private updateBadWordAPI = environment.baseUrl + 'v1/moderator/updateBadword';
  private removeBadWordAPI = environment.baseUrl + 'v1/moderator/removeBadword';


  private listBadWord: any[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  addBadwords(data: any[]): Observable<any[]> {
    return this.http.post<any>(this.addBadWordsAPI, data).pipe(
      tap((response) => {
        new toast({
          title: 'Thông báo!',
          message: 'Đã thêm thành công !',
          type: 'success',
          duration: 3000,
        })
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 301) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Đã tồn tại từ ngữ này rồi!',
              type: 'error',
              duration: 1500,
            }),
          );
        } else {
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

  addBadword(data: any): Observable<any> {
    return this.http.post<any>(this.addBadWordAPI, data).pipe(
      tap((response) => {
        new toast({
          title: 'Thông báo!',
          message: 'Đã thêm thành công !',
          type: 'success',
          duration: 3000,
        })
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 301) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Đã tồn tại từ ngữ này rồi!',
              type: 'error',
              duration: 1500,
            }),
          );
        } else {
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

  updateBadword(data: any, oldName: string): Observable<any> {
    return this.http.put<any>(this.updateBadWordAPI + "/" + oldName, data).pipe(
      tap((response) => {
        new toast({
          title: 'Thông báo!',
          message: 'Cập nhật thành công !',
          type: 'success',
          duration: 3000,
        })
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(
          new toast({
            title: 'Server hiện không hoạt động!',
            message: 'Vui lòng quay lại sau, DaviTickets chân thành xin lỗi vì bất tiện này!',
            type: 'warning',
            duration: 1500,
          })
        );
      })
    );
  }

  removeBadword(name: string): Observable<any> {
    return this.http.delete<any>(this.removeBadWordAPI + "/" + name).pipe(
      tap((response) => {
        new toast({
          title: 'Thông báo!',
          message: 'Xóa thành công !',
          type: 'success',
          duration: 3000,
        })
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(
          new toast({
            title: 'Server hiện không hoạt động!',
            message: 'Vui lòng quay lại sau, DaviTickets chân thành xin lỗi vì bất tiện này!',
            type: 'warning',
            duration: 1500,
          })
        );
      })
    );
  }

  loadDataBadWordApi() {
    return this.http.get<any>(this.loadDataBadWordAPI).pipe(
      tap((response) => {
        this.listBadWord = JSON.parse(JSON.stringify(response));
        this.setDataBadWord(this.listBadWord);
        // console.log("this.listBadWord: " + this.listBadWord)
      })
    );
  }

  /* ============Getter - Setter============= */
  getDataBadWord(): any[] {
    return this.listBadWord;
  }

  setDataBadWord(data: any[]): void {
    this.listBadWord = data;
  }
}
