import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { environment } from '../../../environments/environment'
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import '../../../assets/toast/main.js';
import { DomSanitizer } from '@angular/platform-browser';
declare var toast: any;
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportPostUrl = environment.baseUrl + 'v1/user/report/post';
  private reportAccountUrl = environment.baseUrl + 'v1/user/report/user';
  private loginQRUrl = environment.baseUrl + 'v1/login/qr/app';
  public idUser: any;
  public idPost: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private _sanitizer: DomSanitizer,
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

  /* ============Login QR============= */
  imgQR: any = '';
  checkLoadingdata: boolean = true;
  full_name = this.cookieService.get('full_name');
  $time_qr: any;
  private isOpenQR = new BehaviorSubject<boolean>(false);
  isOpenQR$ = this.isOpenQR.asObservable();
  minutesRemaining: any;
  secondsRemaining: any;

  openQRApi() {
    try {
      return this.http.get(this.loginQRUrl);
    } catch (error) {
      console.error('Error img QR:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }
  remainingTime: number = 0;
  interval: any;
  checkReQR: boolean = false;

  openQR() {
    this.checkReQR = false;
    if(!this.checkReQR){
      this.isOpenQR.next(true);
    }
    try {
      this.remainingTime = 5 * 60;
      this.openQRApi().subscribe((res) => {
        this.imgQR = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res[0]);
        this.checkLoadingdata = false;
        this.updateTimer();
        this.interval = setInterval(() => {
          this.updateTimer();
        }, 1000);
      })
    } catch (error) {
      console.error('Error opening QR:', error);
    }
  }


  updateTimer() {
    this.minutesRemaining = (Math.floor(this.remainingTime / 60) < 10) ? '0' + Math.floor(this.remainingTime / 60) : Math.floor(this.remainingTime / 60);
    this.secondsRemaining = (this.remainingTime % 60 < 10) ? '0' + this.remainingTime % 60 : this.remainingTime % 60;

    if (this.remainingTime == 0) {
      this.checkReQR = true;
      clearInterval(this.interval);
    }
    this.remainingTime--;
  }

  closeQR() {
    this.checkLoadingdata = true;
    this.checkReQR = true;
    this.isOpenQR.next(false);
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
