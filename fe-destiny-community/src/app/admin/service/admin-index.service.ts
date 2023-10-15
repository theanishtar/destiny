import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminIndexService {

  private getTotalPostAPI = environment.baseUrl + 'v1/admin/getTotalPost';
  private getTotalUserAPI = environment.baseUrl + 'v1/admin/getTotalUser';
  private getPercentPostIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentPostIncrease';
  private getPercentUserIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentUserIncrease';
  private getPercentPostSendStatusAPI = environment.baseUrl + 'v1/admin/getPercentPostSendSuccess';
  private getTotalPostEveryMonthAPI = environment.baseUrl + 'v1/admin/getTotalPostEveryMonth';
  private getTotalUserEveryMonthAPI = environment.baseUrl + 'v1/admin/getTotalUserEveryMonth';
  private getUserInteractionAPI = environment.baseUrl + 'v1/admin/getInteractionOfUser';
  private getPercentUserInteractionAPI = environment.baseUrl + 'v1/admin/getPercentUserInteractionIncrease';


  private totalPost: number;
  private totalUser: number;
  private percentPost: number;
  private percentPostIncrease: number;
  private percentUserIncrease: number;
  private listTotalPostEveryMonth: number[] = [];
  private listTotalUserEveryMonth: number[] = [];
  private listInteractionOfUser: number[] = [];
  private percentUserInteraction: number;

  constructor(
    private http: HttpClient

  ) { }

  loadTotalPost() {
    return this.http.get<number>(this.getTotalPostAPI).pipe(
      tap((response) => {
        this.totalPost = response;
        this.setTotalPost(this.totalPost);
      }),
    )
  }

  loadTotalUser() {
    return this.http.get<number>(this.getTotalUserAPI).pipe(
      tap((response) => {
        this.totalUser = response;
        this.setTotalUser(this.totalUser);
      }),
    )
  }

  loadPercentPostIncrease() {
    return this.http.get<number>(this.getPercentPostIncreaseAPI).pipe(
      tap((response) => {
        this.percentPostIncrease = response;
        this.setPercentPostIncrease(this.percentPostIncrease);
      }),
    )
  }

  loadPercentUserIncrease() {
    return this.http.get<number>(this.getPercentUserIncreaseAPI).pipe(
      tap((response) => {
        this.percentUserIncrease = response;
        this.setPercentUserIncrease(this.percentUserIncrease);
      }),
    )
  }

  loadPercent() {
    return this.http.get<number>(this.getPercentPostSendStatusAPI).pipe(
      tap((response) => {
        this.percentPost = response;
        this.setPercentPost(this.percentPost);
      }),
    )
  }

  loadTotalPostEveryMonth() {
    return this.http.get<number>(this.getTotalPostEveryMonthAPI).pipe(
      tap((response) => {
        this.listTotalPostEveryMonth = JSON.parse(JSON.stringify(response));;
        this.setListTotalPostEveryMonth(this.listTotalPostEveryMonth);
      }),
    )
  }

  loadTotalUserEveryMonth() {
    return this.http.get<number>(this.getTotalUserEveryMonthAPI).pipe(
      tap((response) => {
        this.listTotalUserEveryMonth = JSON.parse(JSON.stringify(response));;
        this.setListTotalUserEveryMonth(this.listTotalUserEveryMonth);
      }),
    )
  }

  loadInteraction() {
    return this.http.get<number>(this.getUserInteractionAPI).pipe(
      tap((response) => {
        this.listInteractionOfUser = JSON.parse(JSON.stringify(response));;
        this.setInteraction(this.listInteractionOfUser);
      }),
    )
  }

  loadPercentUserInteractionIncrease() {
    return this.http.get<number>(this.getPercentUserInteractionAPI).pipe(
      tap((response) => {
        this.percentUserInteraction = response;
        this.setPercentUserInteraction(this.percentUserInteraction);
      }),
    )
  }


  //getter
  getTotalPost(): number {
    return this.totalPost;
  }

  getTotalUser(): number {
    return this.totalUser;
  }

  getPercentPostIncrease(): number {
    return this.percentPostIncrease;
  }

  getPercentUserIncrease(): number {
    return this.percentUserIncrease;
  }

  getPercentPost(): number {
    return this.percentPost;
  }

  getListTotalPostEveryMonth(): number[] {
    return this.listTotalPostEveryMonth;
  }

  getListTotalUserEveryMonth(): number[] {
    return this.listTotalUserEveryMonth;
  }

  getInteraction(): number[] {
    return this.listInteractionOfUser;
  }

  getPercentUserInteraction(): number {
    return this.percentUserInteraction;
  }


  //   Setter
  setTotalPost(data: number): void {
    this.totalPost = data;
  }

  setTotalUser(data: number): void {
    this.totalUser = data;
  }

  setPercentPostIncrease(data: number): void {
    this.percentPostIncrease = data;
  }

  setPercentUserIncrease(data: number): void {
    this.percentUserIncrease = data;
  }

  setPercentPost(data: number): void {
    this.percentPost = data;
  }

  setListTotalPostEveryMonth(data: number[]): void{
    this.listTotalPostEveryMonth = data;
  }

  setListTotalUserEveryMonth(data: number[]): void{
    this.listTotalUserEveryMonth = data;
  }

  setInteraction(data: number[]): void{
    this.listInteractionOfUser = data;
  }

  setPercentUserInteraction(data: number): void {
    this.percentUserInteraction = data;
  }

}
