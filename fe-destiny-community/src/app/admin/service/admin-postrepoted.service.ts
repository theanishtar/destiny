import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminPostrepotedService {

  private getListPostReportedByDayAPI = environment.baseUrl + 'v1/admin/getListPostReportedByDay';
  private getListPostReportedByYearAPI = environment.baseUrl + 'v1/admin/getListPostReportedByYear';

  private getTotalPostReportedByDayAPI = environment.baseUrl + 'v1/admin/getTotalPostReportedByDay';
  private getTotalPostReportedByMonthAPI = environment.baseUrl + 'v1/admin/getTotalPostReportedByMonth';
  private getTotalPostReportedByYearAPI = environment.baseUrl + 'v1/admin/getTotalPostReportedByYear';

  private getPercentPostReportedDayIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentPostReportedDayIncrease';
  private getPercentPostReportedMonthIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentPostReportedMonthIncrease';
  private getPercentPostReportedYearIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentPostReportedYearIncrease';

  private listPostReportedByDay: any[] = [];
  private listPostReportedByYear: any[] = [];

  private totalPostReportedByDay: number;
  private totalPostReportedByMonth: number;
  private totalPostReportedByYear: number;

  private percentPostReportedByDayIncrease: number;
  private percentPostReportedByMonthIncrease: number;
  private percentPostReportedByYearIncrease: number;


  constructor(
    private http: HttpClient
  ) { }


  loadListPostReportedByDay() {
    return this.http.get<any>(this.getListPostReportedByDayAPI).pipe(
      tap((response) => {
        this.listPostReportedByDay = JSON.parse(JSON.stringify(response));;
        this.setListPostReportedByDay(this.listPostReportedByDay);
      }),
    )
  }

  loadListPostReportedByYear() {
    return this.http.get<any>(this.getListPostReportedByYearAPI).pipe(
      tap((response) => {
        this.listPostReportedByYear = JSON.parse(JSON.stringify(response));;
        this.setListPostReportedByYear(this.listPostReportedByYear);
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

  getListPostReportedByDay(): any[] {
    return this.listPostReportedByDay;
  }

  getListPostReportedByYear(): any[] {
    return this.listPostReportedByYear;
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

  setListPostReportedByDay(data: any[]): void {
    this.listPostReportedByDay = data;
  }

  setListPostReportedByYear(data: any[]): void {
    this.listPostReportedByYear = data;
  }

}
