import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { environment } from '../../../environments/environment'
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import '../../../assets/toast/main.js';
declare var toast: any;
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportPostUrl = environment.baseUrl + 'v1/user/report/post';
  private reportAccountUrl = environment.baseUrl + 'v1/user/report/user';
  public idUser: any;
  public idPost: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) { 
  }
   /* ============Report post============= */

  private isOpenReportPost = new BehaviorSubject<boolean>(false);
  isOpenReportPost$ = this.isOpenReportPost.asObservable();

  openReportPost(id) {
    this.setIdPost(id);
    this.isOpenReportPost.next(true);
  }

  closeReportPost() {
    this.isOpenReportPost.next(false);
  }


  async reportPostApi(postId: any, content: any): Promise<any> {
    const params = new HttpParams().set('postId', postId.toString()).set('content', content.toString());

    try {
      const response = await this.http.post(this.reportPostUrl, params).toPromise();
      return response;
    } catch (error) {
      console.error('Error in reportPostApi:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }
  /* ============Report account============= */
  private isOpenReportAccount = new BehaviorSubject<boolean>(false);
  isOpenReportAccount$ = this.isOpenReportAccount.asObservable();

  openReportAccount(id) {
    this.setUserId(id);
    this.isOpenReportAccount.next(true);
  }

  closeReportAccount() {
    this.isOpenReportAccount.next(false);
  }

  async reportAccountApi(to: any, content: any): Promise<any> {
    const params = new HttpParams().set('to', to.toString()).set('content', content.toString());

    try {
      const response = await this.http.post(this.reportAccountUrl, params).toPromise();
      return response;
    } catch (error) {
      console.error('Error in reportPostApi:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }


  setUserId(data: any): void {
    this.idUser = data;
  }
  getUserId(): any[] {
    return this.idUser;
  }

  setIdPost(data: any): void {
    this.idPost = data;
  }
  getIdPost(): any[] {
    return this.idPost;
  }
}
