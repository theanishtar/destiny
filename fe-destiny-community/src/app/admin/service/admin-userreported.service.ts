import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminUserreportedService {

  private getListUserReportedByDayAPI = environment.baseUrl + 'v1/admin/getListUserReportedByDay';
  private getListUserReportedByYearAPI = environment.baseUrl + 'v1/admin/getListUserReportedByYear';

  private getTotalUserReportedByDayAPI = environment.baseUrl + 'v1/admin/getTotalUserReportedByDay';
  private getTotalUserReportedByMonthAPI = environment.baseUrl + 'v1/admin/getTotalUserReportedByMonth';
  private getTotalUserReportedByYearAPI = environment.baseUrl + 'v1/admin/getTotalUserReportedByYear';

  private getPercentUserReportedDayIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentUserReportedDayIncrease';
  private getPercentUserReportedMonthIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentUserReportedMonthIncrease';
  private getPercentUserReportedYearIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentUserReportedYearIncrease';

  private listUserReportedByDay: any[] = [];
  private listUserReportedByYear: any[] = [];

  private totalUserReportedByDay: number;
  private totalUserReportedByMonth: number;
  private totalUserReportedByYear: number;

  private percentUserReportedByDayIncrease: number;
  private percentUserReportedByMonthIncrease: number;
  private percentUserReportedByYearIncrease: number;

  constructor(
    private http: HttpClient
  ) { }

  loadListUserReportedByDay() {
    return this.http.get<any>(this.getListUserReportedByDayAPI).pipe(
      tap((response) => {
        this.listUserReportedByDay = JSON.parse(JSON.stringify(response));;
        this.setListUserReportedByDay(this.listUserReportedByDay);
      }),
    )
  }

  loadListUserReportedByYear() {
    return this.http.get<any>(this.getListUserReportedByYearAPI).pipe(
      tap((response) => {
        this.listUserReportedByYear = JSON.parse(JSON.stringify(response));;
        this.setListUserReportedByYear(this.listUserReportedByYear);
      }),
    )
  }

  loadTotalUserReportedByDay() {
    return this.http.get<number>(this.getTotalUserReportedByDayAPI).pipe(
      tap((response) => {
        this.totalUserReportedByDay = response;
        this.setTotalUserReportedByDay(this.totalUserReportedByDay);
      }),
    )
  }

  loadPercentUserReportedByDayIncrease() {
    return this.http.get<number>(this.getPercentUserReportedDayIncreaseAPI).pipe(
      tap((response) => {
        this.percentUserReportedByDayIncrease = response;
        this.setPercentUserReportedByDayIncrease(this.percentUserReportedByDayIncrease);
      }),
    )
  }

  loadTotalUserReportedByMonth() {
    return this.http.get<number>(this.getTotalUserReportedByMonthAPI).pipe(
      tap((response) => {
        this.totalUserReportedByMonth = response;
        this.setTotalUserReportedByMonth(this.totalUserReportedByMonth);
      }),
    )
  }

  loadPercentUserReportedByMonthIncrease() {
    return this.http.get<number>(this.getPercentUserReportedMonthIncreaseAPI).pipe(
      tap((response) => {
        this.percentUserReportedByMonthIncrease = response;
        this.setPercentUserReportedByMonthIncrease(this.percentUserReportedByMonthIncrease);
      }),
    )
  }

  loadTotalUserReportedByYear() {
    return this.http.get<number>(this.getTotalUserReportedByYearAPI).pipe(
      tap((response) => {
        this.totalUserReportedByYear = response;
        this.setTotalUserReportedByYear(this.totalUserReportedByYear);
      }),
    )
  }

  loadPercentUserReportedByYearIncrease() {
    return this.http.get<number>(this.getPercentUserReportedYearIncreaseAPI).pipe(
      tap((response) => {
        this.percentUserReportedByYearIncrease = response;
        this.setPercentUserReportedByYearIncrease(this.percentUserReportedByYearIncrease);
      }),
    )
  }


  //   Getter

  getPercentUserReportedByDayIncrease(): number {
    return this.percentUserReportedByDayIncrease;
  }

  getPercentUserReportedByMonthIncrease(): number {
    return this.percentUserReportedByMonthIncrease;
  }

  getPercentUserReportedByYearIncrease(): number {
    return this.percentUserReportedByYearIncrease;
  }

  getTotalUserReportedByDay(): number {
    return this.totalUserReportedByDay;
  }

  getTotalUserReportedByMonth(): number {
    return this.totalUserReportedByMonth;
  }

  getTotalUserReportedByYear(): number {
    return this.totalUserReportedByYear;
  }

  getListUserReportedByDay(): any[] {
    return this.listUserReportedByDay;
  }

  getListUserReportedByYear(): any[] {
    return this.listUserReportedByYear;
  }


  //   Setter

  setPercentUserReportedByDayIncrease(data: number): void {
    this.percentUserReportedByDayIncrease = data;
  }

  setPercentUserReportedByMonthIncrease(data: number): void {
    this.percentUserReportedByMonthIncrease = data;
  }

  setPercentUserReportedByYearIncrease(data: number): void {
    this.percentUserReportedByYearIncrease = data;
  }

  setTotalUserReportedByDay(data: number): void {
    this.totalUserReportedByDay = data;
  }

  setTotalUserReportedByMonth(data: number): void {
    this.totalUserReportedByMonth = data;
  }

  setTotalUserReportedByYear(data: number): void {
    this.totalUserReportedByYear = data;
  }

  setListUserReportedByDay(data: any[]): void {
    this.listUserReportedByDay = data;
  }

  setListUserReportedByYear(data: any[]): void {
    this.listUserReportedByYear = data;
  }

}
