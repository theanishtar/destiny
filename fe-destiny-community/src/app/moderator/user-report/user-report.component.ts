import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';

import { Router } from '@angular/router';

import { UserReportedService } from '../service/user-reported.service';

declare var $: any;

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: [
    `../../admin/css/sb-admin-2.min.css`,
    `../../admin/css/home.css`
  ]
})
export class UserReportComponent {
  pagiPostReport!: HTMLElement;
  tablePostReport!: HTMLElement;

  day: any;
  month: any;
  year: any;

  listUserReported: any[] = [];

  totalUserByDay: number;
  percentUserByDayIncrease: number;

  totalUserByMonth: number;
  percentUserByMonthIncrease: number;

  totalUserByYear: number;
  percentUserByYearIncrease: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private userReportedService: UserReportedService,
    private routers: Router,

  ) { }

  ngOnInit(): void {
    this.getTime();
  }

  ngAfterViewInit() {
    this.loadListUserReported();
    this.loadTotalUserByDay();
    this.loadTotalUserByMonth();
    this.loadTotalUserByYear();
    this.loadPercentUserByDayIncrease();
    this.loadPercentUserByMonthIncrease();
    this.loadPercentUserByYearIncrease();


  }

  selectUser(id: string, userSendId: string): void {
    localStorage.setItem("userDetailId", id);
    localStorage.setItem("userSendId", userSendId);
    this.routers.navigate(['/moderator/user-report-detail']);
  }

  getTime() {
    this.day = new Date().getDate();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  loadListUserReported() {
    this.userReportedService.loadListUserReported().subscribe(() => {
      this.listUserReported = [];
      this.listUserReported = this.userReportedService.getListUserReported();

      $e(document).ready(function () {
        $e('#dataTable').DataTable();
      });

    });
  }

  loadTotalUserByDay() {
    this.userReportedService.loadTotalUserReportedByDay().subscribe(() => {
      this.totalUserByDay = 0;
      this.totalUserByDay = this.userReportedService.getTotalUserReportedByDay();
    })
  }

  loadPercentUserByDayIncrease() {
    this.userReportedService.loadPercentUserReportedByDayIncrease().subscribe(() => {
      this.percentUserByDayIncrease = 0;
      this.percentUserByDayIncrease = this.userReportedService.getPercentUserReportedByDayIncrease();
    })
  }

  loadTotalUserByMonth() {
    this.userReportedService.loadTotalUserReportedByMonth().subscribe(() => {
      this.totalUserByMonth = 0;
      this.totalUserByMonth = this.userReportedService.getTotalUserReportedByMonth();
    })
  }

  loadPercentUserByMonthIncrease() {
    this.userReportedService.loadPercentUserReportedByMonthIncrease().subscribe(() => {
      this.percentUserByMonthIncrease = 0;
      this.percentUserByMonthIncrease = this.userReportedService.getPercentUserReportedByMonthIncrease();
    })
  }

  loadTotalUserByYear() {
    this.userReportedService.loadTotalUserReportedByYear().subscribe(() => {
      this.totalUserByYear = 0;
      this.totalUserByYear = this.userReportedService.getTotalUserReportedByYear();
    })
  }

  loadPercentUserByYearIncrease() {
    this.userReportedService.loadPercentUserReportedByYearIncrease().subscribe(() => {
      this.percentUserByYearIncrease = 0;
      this.percentUserByYearIncrease = this.userReportedService.getPercentUserReportedByYearIncrease();
    })
  }
}
