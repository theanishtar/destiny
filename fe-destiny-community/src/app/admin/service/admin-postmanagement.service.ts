import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminPostmanagementService {

  private getTOP4PostAPI = environment.baseUrl + 'v1/admin/getTOP4Post';
  private getTOP3ProductAPI = environment.baseUrl + 'v1/admin/getTOP3Product';

  private getTotalPostByDayAPI = environment.baseUrl + 'v1/admin/getTotalPostByDay';
  private getTotalPostByMonthAPI = environment.baseUrl + 'v1/admin/getTotalPostByMonth';
  private getTotalPostByYearAPI = environment.baseUrl + 'v1/admin/getTotalPostByYear';

  private getPercentPostByDayIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentPostDayIncrease';
  private getPercentPostByMonthIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentPostMonthIncrease';
  private getPercentPostByYearIncreaseAPI = environment.baseUrl + 'v1/admin/getPercentPostYearIncrease';


  private listTOP4Post: any[] = [];
  private listTOP3Product: any[] = [];

  private totalPostByDay: number;
  private totalPostByMonth: number;
  private totalPostByYear: number;

  private percentPostByDayIncrease: number;
  private percentPostByMonthIncrease: number;
  private percentPostByYearIncrease: number;

  constructor(
    private http: HttpClient

  ) { }

  loadTotalPostByDay() {
    return this.http.get<number>(this.getTotalPostByDayAPI).pipe(
      tap((response) => {
        this.totalPostByDay = response;
        this.setTotalPostByDay(this.totalPostByDay);
      }),
    )
  }

  loadPercentPostByDayIncrease() {
    return this.http.get<number>(this.getPercentPostByDayIncreaseAPI).pipe(
      tap((response) => {
        this.percentPostByDayIncrease = response;
        this.setPercentPostByDayIncrease(this.percentPostByDayIncrease);
      }),
    )
  }

  loadTotalPostByMonth() {
    return this.http.get<number>(this.getTotalPostByMonthAPI).pipe(
      tap((response) => {
        this.totalPostByMonth = response;
        this.setTotalPostByYear(this.totalPostByMonth);
      }),
    )
  }

  loadPercentPostByMonthIncrease() {
    return this.http.get<number>(this.getPercentPostByMonthIncreaseAPI).pipe(
      tap((response) => {
        this.percentPostByMonthIncrease = response;
        this.setPercentPostByMonthIncrease(this.percentPostByMonthIncrease);
      }),
    )
  }

  loadTotalPostByYear() {
    return this.http.get<number>(this.getTotalPostByYearAPI).pipe(
      tap((response) => {
        this.totalPostByYear = response;
        this.setTotalPostByYear(this.totalPostByYear);
      }),
    )
  }

  loadPercentPostByYearIncrease() {
    return this.http.get<number>(this.getPercentPostByYearIncreaseAPI).pipe(
      tap((response) => {
        this.percentPostByYearIncrease = response;
        this.setPercentPostByYearIncrease(this.percentPostByYearIncrease);
      }),
    )
  }

  loadTOP4Post() {
    return this.http.get<any>(this.getTOP4PostAPI).pipe(
      tap((response) => {
        this.listTOP4Post = JSON.parse(JSON.stringify(response));;
        this.setTOP4Post(this.listTOP4Post);
      }),
    )
  }

  loadTOP3Product() {
    return this.http.get<any>(this.getTOP3ProductAPI).pipe(
      tap((response) => {
        this.listTOP3Product = JSON.parse(JSON.stringify(response));;
        this.setTOP3Product(this.listTOP3Product);
      }),
    )
  }

  //   Getter

  getPercentPostByDayIncrease(): number {
    return this.percentPostByDayIncrease;
  }

  getPercentPostByMonthIncrease(): number {
    return this.percentPostByMonthIncrease;
  }

  getPercentPostByYearIncrease(): number {
    return this.percentPostByYearIncrease;
  }

  getTotalPostByDay(): number {
    return this.totalPostByDay;
  }

  getTotalPostByMonth(): number {
    return this.totalPostByMonth;
  }

  getTotalPostByYear(): number {
    return this.totalPostByYear;
  }

  getTOP4Post(): any[] {
    return this.listTOP4Post;
  }

  getTOP3Product(): any[] {
    return this.listTOP3Product;
  }

  //   Setter

  setPercentPostByDayIncrease(data: number): void {
    this.percentPostByDayIncrease = data;
  }

  setPercentPostByMonthIncrease(data: number): void {
    this.percentPostByMonthIncrease = data;
  }

  setPercentPostByYearIncrease(data: number): void {
    this.percentPostByYearIncrease = data;
  }

  setTotalPostByDay(data: number): void {
    this.totalPostByDay = data;
  }

  setTotalPostByMonth(data: number): void {
    this.totalPostByMonth = data;
  }

  setTotalPostByYear(data: number): void {
    this.totalPostByYear = data;
  }

  setTOP4Post(data: any[]): void {
    this.listTOP4Post = data;
  }

  setTOP3Product(data: any[]): void {
    this.listTOP3Product = data;
  }

}
