import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError} from 'rxjs';
import '../../../assets/toast/main.js';
declare var toast: any;
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private loadDataInterested = environment.baseUrl + 'v1/user/load/history/interested';
  private loadDataShare = environment.baseUrl + 'v1/user/load/history/share';
  private loadDataSendreciever = environment.baseUrl + 'v1/user/load/history/sendreciever';

  private listInterested: any[] = [];
  private listShare: any[] = [];
  private listSendreciever: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
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
}
