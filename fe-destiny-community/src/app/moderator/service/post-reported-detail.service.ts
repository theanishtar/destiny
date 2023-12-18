import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class PostReportedDetailService {


  private getDetailPostAPI = environment.baseUrl + 'v1/moderator/detailPost';
  private sendPostReportedAPI = environment.baseUrl + 'v1/moderator/sendPostReported';
  private deletePostReportedAPI = environment.baseUrl + 'v1/moderator/deletePostReported';

  private postDetail: any[] = [];

  constructor(
    private http: HttpClient

  ) { }

  loadPostDetail(id: string) {
    return this.http.get<any>(this.getDetailPostAPI + "/" + id).pipe(
      tap((response) => {
        this.postDetail = JSON.parse(JSON.stringify(response));;
        this.setPostDetail(this.postDetail);
      }),
    )
  }

  sendToAdmin(idPost: string, idUserSend: string) {
    return this.http.delete(this.sendPostReportedAPI + "/" + idPost + "/" + idUserSend);
  }

  deletePost(idPost: string, idUserSend: string) {
    return this.http.delete(this.deletePostReportedAPI + "/" + idPost + "/" + idUserSend);
  }

  //getter
  getPostDetail(): any {
    return this.postDetail;
  }

  //setter
  setPostDetail(data: any): void {
    this.postDetail = data;
  }

}

