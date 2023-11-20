import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import * as $x from 'jquery';
import { Router } from '@angular/router';

declare var $: any;


import { PostReportedService } from '../service/post-reported.service';


@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: [
    `../../admin/css/sb-admin-2.min.css`,
    `../../admin/css/home.css`
  ]
})
export class PostReportComponent {

  day: any;
  month: any;
  year: any;

  listPostReported: any[] = [];

  totalPostByDay: number;
  percentPostByDayIncrease: number;

  totalPostByMonth: number;
  percentPostByMonthIncrease: number;

  totalPostByYear: number;
  percentPostByYearIncrease: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private postReportedService: PostReportedService,
    private routers: Router,

  ) { }

  ngOnInit(): void {
    this.getTime();
  }

  ngAfterViewInit() {
    this.loadListPostReported();
    this.loadTotalPostByDay();
    this.loadTotalPostByMonth();
    this.loadTotalPostByYear();
    this.loadPercentPostByDayIncrease();
    this.loadPercentPostByMonthIncrease();
    this.loadPercentPostByYearIncrease();

  }

  selectPost(id: string, userSendId: string): void {
    localStorage.setItem("postDetailId", id);
    localStorage.setItem("userSendId", userSendId);
    this.routers.navigate(['/moderator/post-report-detail']);
  }

  getTime() {
    this.day = new Date().getDate();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  loadListPostReported() {
    this.postReportedService.loadListPostReported().subscribe(() => {
      this.listPostReported = [];
      this.listPostReported = this.postReportedService.getListPostReported();

      $x(document).ready(function () {
        $x('#dataTable').DataTable();
      });


    });
  }

  loadTotalPostByDay() {
    this.postReportedService.loadTotalPostReportedByDay().subscribe(() => {
      this.totalPostByDay = 0;
      this.totalPostByDay = this.postReportedService.getTotalPostReportedByDay();
    })
  }

  loadPercentPostByDayIncrease() {
    this.postReportedService.loadPercentPostReportedByDayIncrease().subscribe(() => {
      this.percentPostByDayIncrease = 0;
      this.percentPostByDayIncrease = this.postReportedService.getPercentPostReportedByDayIncrease();
    })
  }

  loadTotalPostByMonth() {
    this.postReportedService.loadTotalPostReportedByMonth().subscribe(() => {
      this.totalPostByMonth = 0;
      this.totalPostByMonth = this.postReportedService.getTotalPostReportedByMonth();
    })
  }

  loadPercentPostByMonthIncrease() {
    this.postReportedService.loadPercentPostReportedByMonthIncrease().subscribe(() => {
      this.percentPostByMonthIncrease = 0;
      this.percentPostByMonthIncrease = this.postReportedService.getPercentPostReportedByMonthIncrease();
    })
  }

  loadTotalPostByYear() {
    this.postReportedService.loadTotalPostReportedByYear().subscribe(() => {
      this.totalPostByYear = 0;
      this.totalPostByYear = this.postReportedService.getTotalPostReportedByYear();
    })
  }

  loadPercentPostByYearIncrease() {
    this.postReportedService.loadPercentPostReportedByYearIncrease().subscribe(() => {
      this.percentPostByYearIncrease = 0;
      this.percentPostByYearIncrease = this.postReportedService.getPercentPostReportedByYearIncrease();
    })
  }


}
