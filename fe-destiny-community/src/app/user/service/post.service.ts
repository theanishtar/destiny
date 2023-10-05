import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import '../../../assets/toast/main.js';
declare var toast: any;

import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private loadDataTop5Post = environment.baseUrl + 'v1/user/getTop5Post';
  private loadDataTop5User = environment.baseUrl + 'v1/user/getTop5User';

  private listTop5User: any[] = [];
  private listTop5Post: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  /* ============Top 5============= */
  loadTop5User() {
    return this.http.get<any>(this.loadDataTop5User).pipe(
      tap((response) => {
        this.listTop5User = JSON.parse(JSON.stringify(response));
        this.setDataTop5User(this.listTop5User);
      }),
    );
  }
  loadTop5Post() {
    return this.http.get<any>(this.loadDataTop5Post).pipe(
      tap((response) => {
        this.listTop5Post = JSON.parse(JSON.stringify(response));
        this.setDataTop5Post(this.listTop5Post);
      }),
    );
  }

  // Getter
  getDataTop5User(): any[] {
    return this.listTop5User;
  }
  getDataTop5Post(): any[] {
    return this.listTop5Post;
  }

  //   Setter
  setDataTop5User(data: any[]): void {
    this.listTop5User = data;
  }
  setDataTop5Post(data: any[]): void {
    this.listTop5Post = data;
  }
}
