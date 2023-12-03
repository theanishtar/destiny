import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminIndexService {

  private getTotalPostAPI = environment.baseUrl + 'v1/admin/getTotalPostByYear';
  private getTotalUserAPI = environment.baseUrl + 'v1/admin/getTotalUserByYear';

  private getTotalPostReportedByYearAPI = environment.baseUrl + 'v1/admin/getTotalPostReportedByYear';
  private getTotalUserReportedByYearAPI = environment.baseUrl + 'v1/admin/getTotalUserReportedByYear';

  private getPercentPostIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentPostYearIncrease';
  private getPercentUserIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentUserYearIncrease';

  private getPercentPostReportedIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentPostReportedYearIncrease';
  private getPercentUserReportedIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentUserReportedYearIncrease';

  private getPercentPostSendStatusAPI = environment.baseUrl + 'v1/admin/getPercentPostSendSuccess';

  private getTotalPostEveryMonthAPI = environment.baseUrl + 'v1/admin/getTotalPostEveryMonth';
  private getTotalUserEveryMonthAPI = environment.baseUrl + 'v1/admin/getTotalUserEveryMonth';

  private getUserInteractionAPI = environment.baseUrl + 'v1/admin/getInteractionOfUser';

  private getPercentUserInteractionAPI = environment.baseUrl + 'v1/admin/getPercentUserInteractionIncrease';


  private totalPost: number;
  private totalUser: number;

  private totalPostReported: number;
  private totalUserReported: number;

  private percentPostSendSuccess: number;

  private percentPostIncrease: number;
  private percentUserIncrease: number;

  private percentPostReportedIncrease: number;
  private percentUserReportedIncrease: number;

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

  loadTotalPostReported() {
    return this.http.get<number>(this.getTotalPostReportedByYearAPI).pipe(
      tap((response) => {
        this.totalPostReported = response;
        this.setTotalPostReported(this.totalPostReported);
      }),
    )
  }

  loadTotalUserReported() {
    return this.http.get<number>(this.getTotalUserReportedByYearAPI).pipe(
      tap((response) => {
        this.totalUserReported = response;
        this.setTotalUserReported(this.totalUserReported);
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

  loadPercentPostReportedIncrease() {
    return this.http.get<number>(this.getPercentPostReportedIncreaseAPI).pipe(
      tap((response) => {
        this.percentPostReportedIncrease = response;
        this.setPercentPostReportedIncrease(this.percentPostReportedIncrease);
      }),
    )
  }

  loadPercentUserReportedIncrease() {
    return this.http.get<number>(this.getPercentUserReportedIncreaseAPI).pipe(
      tap((response) => {
        this.percentUserReportedIncrease = response;
        this.setPercentUserReportedIncrease(this.percentUserReportedIncrease);
      }),
    )
  }

  loadPercent() {
    return this.http.get<number>(this.getPercentPostSendStatusAPI).pipe(
      tap((response) => {
        this.percentPostSendSuccess = response;
        this.setPercentPostSendSuccess(this.percentPostSendSuccess);
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

  getPercentPostSendSuccess(): number {
    return this.percentPostSendSuccess;
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

  getTotalPostReported(): number {
    return this.totalPostReported;
  }

  getTotalUserReported(): number {
    return this.totalUserReported;
  }

  getPercentPostReportedIncrease(): number {
    return this.percentPostReportedIncrease;
  }

  getPercentUserReportedIncrease(): number {
    return this.percentUserReportedIncrease;
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

  setPercentPostSendSuccess(data: number): void {
    this.percentPostSendSuccess = data;
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

  setTotalPostReported(data: number): void {
    this.totalPostReported = data;
  }

  setTotalUserReported(data: number): void {
    this.totalUserReported = data;
  }

  setPercentPostReportedIncrease(data: number): void {
    this.percentPostReportedIncrease = data;
  }

  setPercentUserReportedIncrease(data: number): void {
    this.percentUserReportedIncrease = data;
  }

}
