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

export class FollowsService {
  private loadDataFling = environment.baseUrl + 'v1/user/following/load/data';
  private loadDataFriend = environment.baseUrl + 'v1/user/friends/load/data';
  private loadDataFler = environment.baseUrl + 'v1/user/follower/load/data';

  private deleteFling = environment.baseUrl + 'v1/user/following/delete';
  private deleteFler = environment.baseUrl + 'v1/user/follower/delete';

  private loadDataSuggested = environment.baseUrl + 'v1/user/following/load/suggest';
  private addFollowUrl = environment.baseUrl + 'v1/user/following/addFollow';

  private listFollowing: any[] = [];
  private listFollower: any[] = [];
  private listFriend: any[] = [];
  private listSuggested: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  /* ============following============= */
  loadDataFollowing() {
    return this.http.get<any>(this.loadDataFling).pipe(
      tap((response) => {
        this.listFollowing = JSON.parse(JSON.stringify(response));
        this.setDataFling(this.listFollowing);
      }),
    );
  }

  deleteFollowing(data: any) {
    return this.http.post<any[]>(this.deleteFling, data).pipe(
      tap((response) => {
        this.listFollowing = JSON.parse(JSON.stringify(response));
        this.setDataFling(this.listFollowing);
      }),
    );
  }

  /* ============follower============= */
  loadDataFollower() {
    return this.http.get<any>(this.loadDataFler).pipe(
      tap((response) => {
        this.listFollower = JSON.parse(JSON.stringify(response));
        this.setDataFler(this.listFollower);
      }),
    );
  }

  deleteFollower(data: any) {
    return this.http.post<any[]>(this.deleteFler, data).pipe(
      tap((response) => {
        this.listFollower = JSON.parse(JSON.stringify(response));
        this.setDataFler(this.listFollower);
      }),
    );
  }

  /* ============friend============= */
  loadDataFriends() {
    return this.http.get<any>(this.loadDataFriend).pipe(
      tap((response) => {
        this.listFriend = JSON.parse(JSON.stringify(response));
        this.setDataFriend(this.listFriend);
      }),
    );
  }

  /* ============Suggested============= */
  loadDataSuggest() {
    return this.http.get<any>(this.loadDataSuggested).pipe(
      tap((response) => {
        this.listSuggested = JSON.parse(JSON.stringify(response));
        this.setDataSuggested(this.listSuggested);
      }),
    );
  }
  // async loadDataSuggest() {
  //   try {
  //     const response = await this.http.get<any>(this.loadDataSuggested).toPromise();
  //     this.listSuggested = JSON.parse(JSON.stringify(response));
  //     this.setDataSuggested(this.listSuggested);
  //   } catch (error) {
  //     // Xử lý lỗi nếu có
  //     console.error('Error:', error);
  //   }
  // }
  

  addFollow(data: any) {
    return this.http.post<any[]>(this.addFollowUrl, data).pipe(
      tap((response) => {
        console.log("Follow thành công");
      }),
    );
  }

  // Getter
  getDataFling(): any[] {
    return this.listFollowing;
  }
  getDataFler(): any[] {
    return this.listFollower;
  }
  getDataFriend(): any[] {
    return this.listFriend;
  }
  getDataSuggested(): any[] {
    return this.listSuggested;
  }

  //   Setter
  setDataFling(data: any[]): void {
    this.listFollowing = data;
  }
  setDataFler(data: any[]): void {
    this.listFollower = data;
  }
  setDataFriend(data: any[]): void {
    this.listFriend = data;
  }
  setDataSuggested(data: any[]): void {
    this.listSuggested = data;
  }
}
