import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminUsermanagementService {

  private getTOP4UserAPI = environment.baseUrl + 'v1/admin/getTOP4User';

  private getTotalUserByDayAPI = environment.baseUrl + 'v1/admin/getTotalUserByDay';
  private getTotalUserByMonthAPI = environment.baseUrl + 'v1/admin/getTotalUserByMonth';
  private getTotalUserByYearAPI = environment.baseUrl + 'v1/admin/getTotalUserByYear';

  private getPercentUserByDayIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentUserDayIncrease';
  private getPercentUserByMonthIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentUserMonthIncrease';
  private getPercentUserByYearIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentUserYearIncrease';

  private listTOP4User: any[] = [];

  private totalUserByDay: number;
  private totalUserByMonth: number;
  private totalUserByYear: number;

  private percentUserByDayIncrease: number;
  private percentUserByMonthIncrease: number;
  private percentUserByYearIncrease: number;

  constructor(
    private http: HttpClient

  ) { }


  loadTotalUserByDay() {
    return this.http.get<number>(this.getTotalUserByDayAPI).pipe(
      tap((response) => {
        this.totalUserByDay = response;
        this.setTotalUserByDay(this.totalUserByDay);
      }),
    )
  }

  loadPercentUserByDayIncrease() {
    return this.http.get<number>(this.getPercentUserByDayIncreaseAPI).pipe(
      tap((response) => {
        this.percentUserByDayIncrease = response;
        this.setPercentUserByDayIncrease(this.percentUserByDayIncrease);
      }),
    )
  }

  loadTotalUserByMonth() {
    return this.http.get<number>(this.getTotalUserByMonthAPI).pipe(
      tap((response) => {
        this.totalUserByMonth = response;
        this.setTotalUserByMonth(this.totalUserByMonth);
      }),
    )
  }

  loadPercentUserByMonthIncrease() {
    return this.http.get<number>(this.getPercentUserByMonthIncreaseAPI).pipe(
      tap((response) => {
        this.percentUserByMonthIncrease = response;
        this.setPercentUserByMonthIncrease(this.percentUserByMonthIncrease);
      }),
    )
  }

  loadTotalUserByYear() {
    return this.http.get<number>(this.getTotalUserByYearAPI).pipe(
      tap((response) => {
        this.totalUserByYear = response;
        this.setTotalUserByYear(this.totalUserByYear);
      }),
    )
  }

  loadPercentUserByYearIncrease() {
    return this.http.get<number>(this.getPercentUserByYearIncreaseAPI).pipe(
      tap((response) => {
        this.percentUserByYearIncrease = response;
        this.setPercentUserByYearIncrease(this.percentUserByYearIncrease);
      }),
    )
  }

  loadTOP4User() {
    return this.http.get<any>(this.getTOP4UserAPI).pipe(
      tap((response) => {
        this.listTOP4User = JSON.parse(JSON.stringify(response));;
        this.setTOP4User(this.listTOP4User);
      }),
    )
  }


  //   Getter

  getPercentUserByDayIncrease(): number {
    return this.percentUserByDayIncrease;
  }

  getPercentUserByMonthIncrease(): number {
    return this.percentUserByMonthIncrease;
  }

  getPercentUserByYearIncrease(): number {
    return this.percentUserByYearIncrease;
  }

  getTotalUserByDay(): number {
    return this.totalUserByDay;
  }

  getTotalUserByMonth(): number {
    return this.totalUserByMonth;
  }

  getTotalUserByYear(): number {
    return this.totalUserByYear;
  }

  getTOP4User(): any[] {
    return this.listTOP4User;
  }

  //   Setter

  setPercentUserByDayIncrease(data: number): void {
    this.percentUserByDayIncrease = data;
  }

  setPercentUserByMonthIncrease(data: number): void {
    this.percentUserByMonthIncrease = data;
  }

  setPercentUserByYearIncrease(data: number): void {
    this.percentUserByYearIncrease = data;
  }

  setTotalUserByDay(data: number): void {
    this.totalUserByDay = data;
  }

  setTotalUserByMonth(data: number): void {
    this.totalUserByMonth = data;
  }

  setTotalUserByYear(data: number): void {
    this.totalUserByYear = data;
  }

  setTOP4User(data: any[]): void {
    this.listTOP4User = data;
  }


}
