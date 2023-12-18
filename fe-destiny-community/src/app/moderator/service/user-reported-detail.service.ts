import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserReportedDetailService {

  private getDetailUserAPI = environment.baseUrl + 'v1/moderator/detailUser';
  private sendUserReportedAPI = environment.baseUrl + 'v1/moderator/sendUserReported';
  private deleteUserReportedAPI = environment.baseUrl + 'v1/moderator/deleteUserReported';

  private userDetail: any[] = [];

  constructor(
    private http: HttpClient

  ) { }

  loadUserDetail(email: string) {
    return this.http.get<any>(this.getDetailUserAPI + "/" + email).pipe(
      tap((response) => {
        this.userDetail = JSON.parse(JSON.stringify(response));;
        this.setUserDetail(this.userDetail);
      }),
    )
  }

  sendToAdmin(idUser: string, idUserSend: string) {
    return this.http.delete(this.sendUserReportedAPI + "/" + idUser + "/" + idUserSend);
  }

  deleteUser(idUser: string, idUserSend: string) {
    return this.http.delete(this.deleteUserReportedAPI + "/" + idUser + "/" + idUserSend);
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
