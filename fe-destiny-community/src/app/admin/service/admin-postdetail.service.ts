import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AdminPostdetailService {

  private getDetailPostAPI = environment.baseUrl + 'v1/admin/detailPost';
  private actionOnPostAPI = environment.baseUrl + 'v1/admin/actionOnPost';

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

  actionOnPost(id: string) {
    return this.http.get(this.actionOnPostAPI + "/" + id);
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
