import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserdetailService {

  private getDetailUserAPI = environment.baseUrl + 'v1/admin/detailUser';
  private actionOnUserAPI = environment.baseUrl + 'v1/admin/actionOnUser';

  private userDetail: any[] = [];

  constructor(
    private http: HttpClient

  ) { }

  loadPostDetail(email: string) {
    return this.http.get<any>(this.getDetailUserAPI + "/" + email).pipe(
      tap((response) => {
        this.userDetail = JSON.parse(JSON.stringify(response));;
        this.setUserDetail(this.userDetail);
      }),
    )
  }

  actionOnUser(email: string) {
    return this.http.get(this.actionOnUserAPI + "/" + email);
  }


  //getter
  getUserDetail(): any {
    return this.userDetail;
  }

  //setter
  setUserDetail(data: any): void {
    this.userDetail = data;
  }
}
