import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import Swal from 'sweetalert2';
declare var toast: any;
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModerManagenentService {
  private getListModeratorsAPI = environment.baseUrl + 'v1/admin/get/moderator';
  private actionOnModerAPI = environment.baseUrl + 'v1/admin/actionOnModer';
  private createModerAPI = environment.baseUrl + 'v1/admin/createModer';


  private listModers: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  loadListModers() {
    return this.http.get<any>(this.getListModeratorsAPI).pipe(
      tap((response) => {
        this.listModers = JSON.parse(JSON.stringify(response));;
        this.setListModers(this.listModers);
      }),
    )
  }

  actionOnModer(id: number) {
    return this.http.get(this.actionOnModerAPI + "/" + id);
  }

  createModer(data: any): Observable<any> {
    return this.http.post(this.createModerAPI, data).pipe(

      catchError((error: HttpErrorResponse) => {
        if (error.status === 301) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Tên đăng nhập đã tồn tại vui lòng chọn tên đăng nhập khác!',
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

  getListModers(): any[] {
    return this.listModers;
  }

  setListModers(data: any[]): void {
    this.listModers = data;
  }

}
