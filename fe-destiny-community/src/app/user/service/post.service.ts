import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import '../../../assets/toast/main.js';
declare var toast: any;

import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private loadDataTop5Post = environment.baseUrl + 'v1/user/getTop5Post';
  private loadDataTop5User = environment.baseUrl + 'v1/user/getTop5User';

  private loadDataPosts = environment.baseUrl + 'v1/user/load/post';
  // private loadDataComment = environment.baseUrl + 'v1/user/load/comment';

  private listTop5User: any[] = [];
  private listTop5Post: any[] = [];
  private listPostsNf: any;
  // private listComment: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  /* ============Top 5============= */
  loadTop5User(): Observable<any[]> {
    return this.http.get<any>(this.loadDataTop5User).pipe(
      tap((response) => {
        this.listTop5User = JSON.parse(JSON.stringify(response));
        this.setDataTop5User(this.listTop5User);
      }),
    );
  }
  loadTop5Post(): Observable<any[]> {
    return this.http.get<any>(this.loadDataTop5Post).pipe(
      tap((response) => {
        this.listTop5Post = JSON.parse(JSON.stringify(response));
        this.setDataTop5Post(this.listTop5Post);
      }),
    );
  }
  
  /* ============Posts newsfeed============= */
  loadPostNewsFeed(): Observable<any> {
    return this.http.get<any>(this.loadDataPosts).pipe(
      tap((response) => {
        this.setDataPostNf(response); 
      }),
    );
  }
  
  // Getter - Setter
  getDataTop5User(): any[] {
    return this.listTop5User;
  }
  setDataTop5User(data: any[]): void {
    this.listTop5User = data;
  }
  getDataTop5Post(): any[] {
    return this.listTop5Post;
  }
  setDataTop5Post(data: any[]): void {
    this.listTop5Post = data;
  }
  getDataPostNf(): any {
    return this.listPostsNf;
  }
  setDataPostNf(data: any): void {
    this.listPostsNf = data;
  }
}
