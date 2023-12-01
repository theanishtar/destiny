import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PostReportedService {

  private getListPostReportedAPI = environment.baseUrl + 'v1/moderator/postReporteds';

  private getTotalPostReportedByDayAPI = environment.baseUrl + 'v1/moderator/getTotalPostReportedByDay';
  private getTotalPostReportedByMonthAPI = environment.baseUrl + 'v1/moderator/getTotalPostReportedByMonth';
  private getTotalPostReportedByYearAPI = environment.baseUrl + 'v1/moderator/getTotalPostReportedByYear';

  private getPercentPostReportedDayIncreaseAPI = environment.baseUrl + 'v1/moderator/getPercentPostReportedDayIncrease';
  private getPercentPostReportedMonthIncreaseAPI = environment.baseUrl + 'v1/moderator/getPercentPostReportedMonthIncrease';
  private getPercentPostReportedYearIncreaseAPI = environment.baseUrl + 'v1/moderator/getPercentPostReportedYearIncrease';

  private listPostReported: any[] = [];

  private totalPostReportedByDay: number;
  private totalPostReportedByMonth: number;
  private totalPostReportedByYear: number;

  private percentPostReportedByDayIncrease: number;
  private percentPostReportedByMonthIncrease: number;
  private percentPostReportedByYearIncrease: number;


  constructor(
    private http: HttpClient
  ) { }


  loadListPostReported() {
    return this.http.get<any>(this.getListPostReportedAPI).pipe(
      tap((response) => {
        this.listPostReported = JSON.parse(JSON.stringify(response));;
        this.setListPostReported(this.listPostReported);
      }),
    )
  }

  loadTotalPostReportedByDay() {
    return this.http.get<number>(this.getTotalPostReportedByDayAPI).pipe(
      tap((response) => {
        this.totalPostReportedByDay = response;
        this.setTotalPostReportedByDay(this.totalPostReportedByDay);
      }),
    )
  }

  loadPercentPostReportedByDayIncrease() {
    return this.http.get<number>(this.getPercentPostReportedDayIncreaseAPI).pipe(
      tap((response) => {
        this.percentPostReportedByDayIncrease = response;
        this.setPercentPostReportedByDayIncrease(this.percentPostReportedByDayIncrease);
      }),
    )
  }

  loadTotalPostReportedByMonth() {
    return this.http.get<number>(this.getTotalPostReportedByMonthAPI).pipe(
      tap((response) => {
        this.totalPostReportedByMonth = response;
        this.setTotalPostReportedByMonth(this.totalPostReportedByMonth);
      }),
    )
  }

  loadPercentPostReportedByMonthIncrease() {
    return this.http.get<number>(this.getPercentPostReportedMonthIncreaseAPI).pipe(
      tap((response) => {
        this.percentPostReportedByMonthIncrease = response;
        this.setPercentPostReportedByMonthIncrease(this.percentPostReportedByMonthIncrease);
      }),
    )
  }

  loadTotalPostReportedByYear() {
    return this.http.get<number>(this.getTotalPostReportedByYearAPI).pipe(
      tap((response) => {
        this.totalPostReportedByYear = response;
        this.setTotalPostReportedByYear(this.totalPostReportedByYear);
      }),
    )
  }

  loadPercentPostReportedByYearIncrease() {
    return this.http.get<number>(this.getPercentPostReportedYearIncreaseAPI).pipe(
      tap((response) => {
        this.percentPostReportedByYearIncrease = response;
        this.setPercentPostReportedByYearIncrease(this.percentPostReportedByYearIncrease);
      }),
    )
  }


  //   Getter

  getPercentPostReportedByDayIncrease(): number {
    return this.percentPostReportedByDayIncrease;
  }

  getPercentPostReportedByMonthIncrease(): number {
    return this.percentPostReportedByMonthIncrease;
  }

  getPercentPostReportedByYearIncrease(): number {
    return this.percentPostReportedByYearIncrease;
  }

  getTotalPostReportedByDay(): number {
    return this.totalPostReportedByDay;
  }

  getTotalPostReportedByMonth(): number {
    return this.totalPostReportedByMonth;
  }

  getTotalPostReportedByYear(): number {
    return this.totalPostReportedByYear;
  }

  getListPostReported(): any[] {
    return this.listPostReported;
  }

  //   Setter

  setPercentPostReportedByDayIncrease(data: number): void {
    this.percentPostReportedByDayIncrease = data;
  }

  setPercentPostReportedByMonthIncrease(data: number): void {
    this.percentPostReportedByMonthIncrease = data;
  }

  setPercentPostReportedByYearIncrease(data: number): void {
    this.percentPostReportedByYearIncrease = data;
  }

  setTotalPostReportedByDay(data: number): void {
    this.totalPostReportedByDay = data;
  }

  setTotalPostReportedByMonth(data: number): void {
    this.totalPostReportedByMonth = data;
  }

  setTotalPostReportedByYear(data: number): void {
    this.totalPostReportedByYear = data;
  }

  setListPostReported(data: any[]): void {
    this.listPostReported = data;
  }
}
