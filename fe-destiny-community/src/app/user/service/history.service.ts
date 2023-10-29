import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError} from 'rxjs';
import '../../../assets/toast/main.js';
declare var toast: any;
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { environment } from '../../../environments/environment';
import { ModalService } from './modal.service';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private loadDataInterested = environment.baseUrl + 'v1/user/load/history/interested';
  private loadDataShare = environment.baseUrl + 'v1/user/load/history/share';
  private loadDataSendreciever = environment.baseUrl + 'v1/user/load/history/sendreciever';
  private loadDataDetail = environment.baseUrl + 'v1/user/load/post/history';

  private listInterested: any[] = [];
  private listShare: any[] = [];
  private listSendreciever: any[] = [];
  public detailPost: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: ModalService
  ) { }


  /* ============Interested============ */
  async loadInterested(): Promise<any[]> {
    try {
      const response = await this.http.get<any>(this.loadDataInterested).toPromise();
      this.listInterested = JSON.parse(JSON.stringify(response));
      this.setDataInterested(this.listInterested);
      return this.listInterested;
    } catch (error) {
      throw error;
    }
  }

   /* ============Share============ */
   async loadShare(): Promise<any[]> {
    try {
      const response = await this.http.get<any>(this.loadDataShare).toPromise();
      this.listShare = JSON.parse(JSON.stringify(response));
      this.setDataShare(this.listShare);
      return this.listShare;
    } catch (error) {
      throw error;
    }
  }

  /* ============Sendreciever============ */
  async loadSendreciever(): Promise<any[]> {
    try {
      const response = await this.http.get<any>(this.loadDataSendreciever).toPromise();
      this.listSendreciever = JSON.parse(JSON.stringify(response));
      this.setDataSendreciever(this.listSendreciever);
      return this.listSendreciever;
    } catch (error) {
      throw error;
    }
  }

  /* ============Detail-post============ */
  private isOpenDetailPost = new BehaviorSubject<boolean>(false);
  isOpenDetailPost$ = this.isOpenDetailPost.asObservable();

  callApiDetailPost(data: any): Observable<any> {
    return this.http.post(this.loadDataDetail, data).pipe(
      tap((response) => {
        this.setDatadetail(response);
      }),
    );
  }
  public images: any[]
  public post: any;
  public listCount: any;
  public listUser: any;
  public listCmt: any
  openModalDetailPost(idPost) {
    this.isOpenDetailPost.next(true);
    this.callApiDetailPost(idPost).subscribe(() => {
      this.detailPost = this.getDataDetail();
      this.post = this.detailPost[0];
      this.images = this.detailPost[0].postImages;
      this.listCount = this.detailPost[1];
      this.listUser = this.detailPost[2];
      this.listCmt = this.detailPost[3];
      console.log("this.detailPost: " + this.detailPost[0].post_id)
      // this.modalService.loadComment(idPost, userId)
    })
  }

  closeModalDetailPost() {
    this.isOpenDetailPost.next(false);
  }

  /* ============Getter - Setter============= */
  getDataInterested(): any[] {
    return this.listInterested;
  }
  setDataInterested(data: any[]): void {
    this.listInterested = data;
  }
  getDataShare(): any[] {
    return this.listShare;
  }
  setDataShare(data: any[]): void {
    this.listShare = data;
  }
  getDataSendreciever(): any[] {
    return this.listSendreciever;
  }
  setDataSendreciever(data: any[]): void {
    this.listSendreciever = data;
  }

  getDataDetail(): any{
    return this.detailPost;
  }
  setDatadetail(data: any): void {
    this.detailPost = data;
  }
}
