import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import '../../../assets/toast/main.js';
declare var toast: any;
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment'
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminManagementService {
  private loadDataListAdmin = environment.baseUrl + 'v1/owner/get/admin';
  private loadDataListMod = environment.baseUrl + 'v1/owner/get/moderator';
  private loadDataInfoOwner = environment.baseUrl + 'v1/owner/get/infor';
  private updateOwner = environment.baseUrl + 'v1/owner/updateProfile';
  private updateStatus = environment.baseUrl + 'v1/owner/updateStatusAdmin/';
  private createUser = environment.baseUrl + 'v1/owner/create/';

  private getTotalPostAPI = environment.baseUrl + 'v1/owner/totalPost';
  private getTotalUserAPI = environment.baseUrl + 'v1/owner/totalUser';

  private getTotalPostEveryMonthAPI = environment.baseUrl + 'v1/owner/getTotalPostEveryMonth';
  private getTotalUserEveryMonthAPI = environment.baseUrl + 'v1/owner/getTotalUserEveryMonth';

  private totalPost: number;
  private totalUser: number;

  private listTotalPostEveryMonth: number[] = [];
  private listTotalUserEveryMonth: number[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  loadTotalPost() {
    return this.http.get<number>(this.getTotalPostAPI).pipe(
      tap((response) => {
        this.totalPost = response;
        this.setTotalPost(this.totalPost);
      }),
    )
  }

  loadTotalUser() {
    return this.http.get<number>(this.getTotalUserAPI).pipe(
      tap((response) => {
        this.totalUser = response;
        this.setTotalUser(this.totalUser);
      }),
    )
  }

  loadTotalPostEveryMonth() {
    return this.http.get<number>(this.getTotalPostEveryMonthAPI).pipe(
      tap((response) => {
        this.listTotalPostEveryMonth = JSON.parse(JSON.stringify(response));;
        this.setListTotalPostEveryMonth(this.listTotalPostEveryMonth);
      }),
    )
  }

  loadTotalUserEveryMonth() {
    return this.http.get<number>(this.getTotalUserEveryMonthAPI).pipe(
      tap((response) => {
        this.listTotalUserEveryMonth = JSON.parse(JSON.stringify(response));;
        this.setListTotalUserEveryMonth(this.listTotalUserEveryMonth);
      }),
    )
  }

  async loadDataListAdminApi(): Promise<any> {
    try {
      const response = await this.http.get<any>(this.loadDataListAdmin).toPromise();
      // Process the response if needed
      return response;
    } catch (error) {
      console.error('Error in loadDataListAdminApi:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  async loadDataListModApi(): Promise<any> {
    try {
      const response = await this.http.get<any>(this.loadDataListMod).toPromise();
      // Process the response if needed
      return response;
    } catch (error) {
      console.error('Error in loadDataListModApi:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  async loadDataInfoOwnerApi(): Promise<any> {
    try {
      const response = await this.http.get<any>(this.loadDataInfoOwner).toPromise();
      // Process the response if needed
      return response;
    } catch (error) {
      console.error('Error in loadDataInfoOwnerApi:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  updateOwnerApi(data: any): Observable<any> {
    return this.http.put(this.updateOwner, data).pipe(
      tap(() => {

      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 200) {
          return [];
        } else if (error.status === 203) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Tên đăng nhập đã tồn tại',
              type: 'error',
              duration: 1500,
            })
          );
        }
        else {
          // Handle other errors
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Lỗi!!',
              type: 'warning',
              duration: 3000,
            })
          );
        }
      })
    );
  }

  updateStatusApi(id: number): Observable<any> {
    const url = `${this.updateStatus}${id}`;
    return this.http.patch<any>(url, {});
  }

  createUserApi(data, role: number): Observable<any> {
    const url = `${this.createUser}${role}`;
    return this.http.post<any>(url, data).pipe(
      tap(() => {

      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 200) {
          return [];
        } else if (error.status === 301) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Tên đăng nhập đã tồn tại',
              type: 'error',
              duration: 1500,
            })
          );
        }
        else {
          // Handle other errors
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Lỗi!!',
              type: 'warning',
              duration: 3000,
            })
          );
        }
      })
    );
  }

  //getter
  getTotalPost(): number {
    return this.totalPost;
  }

  getTotalUser(): number {
    return this.totalUser;
  }

  getListTotalPostEveryMonth(): number[] {
    return this.listTotalPostEveryMonth;
  }

  getListTotalUserEveryMonth(): number[] {
    return this.listTotalUserEveryMonth;
  }

  //   Setter
  setTotalPost(data: number): void {
    this.totalPost = data;
  }

  setTotalUser(data: number): void {
    this.totalUser = data;
  }

  setListTotalPostEveryMonth(data: number[]): void{
    this.listTotalPostEveryMonth = data;
  }

  setListTotalUserEveryMonth(data: number[]): void{
    this.listTotalUserEveryMonth = data;
  }
}
