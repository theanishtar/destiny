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
export class ProfileService {
  private loadDataHeaderUrl = environment.baseUrl + 'v1/user/profile/data/header';

  private dataHeader: any[];
  
  constructor(
    private http: HttpClient,
  ) { }

  loadDataHeader(data: any) {
    return this.http.post<any[]>(this.loadDataHeaderUrl, data).pipe(
      tap((response) => {
        this.dataHeader = response;
        this.setDataHeader(this.dataHeader);
        // console.warn("this.dataHeader: " + JSON.stringify(this.getDataHeader()));
      }),
    );
  }

  getDataHeader(): any[] {
    return this.dataHeader;
  }
  setDataHeader(data: any[]): void {
    this.dataHeader = data;
  }

}
