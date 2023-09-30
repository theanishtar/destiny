import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import '../../../assets/toast/main.js';
declare var toast: any;

import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})

export class FollowsService {
  private loadDataFling = environment.baseUrl + 'v1/user/following/load/data';
  private deleteFling = environment.baseUrl + 'v1/user/following/delete';

  private dataFollowing: any[] = [];

  loadDataFollowing() {
    return this.http.get<any>(this.loadDataFling).pipe(
      tap((response) => {
        this.dataFollowing = JSON.parse(JSON.stringify(response));
					this.setDataFling(this.dataFollowing);
      }),
    );
  }

  deleteFollowing(data: any) {
  return this.http.post<any[]>(this.deleteFling, data).pipe(
    // tap(() => console.log("Lấy dữ liệu thành công")),
    tap((response) => {
      this.dataFollowing = JSON.parse(JSON.stringify(response));
        this.setDataFling(this.dataFollowing);
    }),
  );
}
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  // Getter
	getDataFling(): any[] {
		return this.dataFollowing;
	}

	//   Setter
	setDataFling(data: any[]): void {
		this.dataFollowing = data;
	}
}
