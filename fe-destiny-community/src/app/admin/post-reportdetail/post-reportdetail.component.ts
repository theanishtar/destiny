import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import * as $x from 'jquery';
import { Router } from '@angular/router';

import { AdminPostrepotedService } from '../service/admin-postrepoted.service';

declare var $: any;

@Component({
  selector: 'app-post-reportdetail',
  templateUrl: './post-reportdetail.component.html',
  styleUrls: [
    `../css/sb-admin-2.min.css`,
    `../css/home.css`
  ],
})
export class PostReportdetailComponent implements OnInit {

  pagiPostReport!: HTMLElement;
  tablePostReport!: HTMLElement;

  day: any;
  month: any;
  year: any;

  listPostReportedByDay: any[] = [];
  listPostReportedByYear: any[] = [];

  totalPostByDay: number;
  percentPostByDayIncrease: number;

  totalPostByMonth: number;
  percentPostByMonthIncrease: number;

  totalPostByYear: number;
  percentPostByYearIncrease: number;



  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private adminPostrepotedService: AdminPostrepotedService,
    private routers: Router,

  ) { }

  ngOnInit(): void {
    this.getTime();
  }

  ngAfterViewInit() {
    this.carousel();
    this.loadListPostReportedByDay();
    this.loadListPostReportedByYear();
    this.loadTotalPostByDay();
    this.loadTotalPostByMonth();
    this.loadTotalPostByYear();
    this.loadPercentPostByDayIncrease();
    this.loadPercentPostByMonthIncrease();
    this.loadPercentPostByYearIncrease();

    this.pagiPostReport = this.el.nativeElement.querySelector("#pagi-post-report");
    this.tablePostReport = this.el.nativeElement.querySelector("#table-post-report");

  }

  selectPost(id: string): void {
    localStorage.setItem("postDetailId", id);
    this.routers.navigate(['/admin/postdetail']);
  }

  selectUser(email: string): void {
    localStorage.setItem("userDetailEmail", email);
    this.routers.navigate(['/admin/userdetail']);
  }

  getTime() {
    this.day = new Date().getDay();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  loadListPostReportedByDay() {
    this.adminPostrepotedService.loadListPostReportedByDay().subscribe(() => {
      this.listPostReportedByDay = [];
      this.listPostReportedByDay = this.adminPostrepotedService.getListPostReportedByDay();
    });
  }

  loadListPostReportedByYear() {
    this.adminPostrepotedService.loadListPostReportedByYear().subscribe(() => {
      this.listPostReportedByYear = [];
      this.listPostReportedByYear = this.adminPostrepotedService.getListPostReportedByYear();

      $x(document).ready(function () {
        $x('#dataTable').DataTable();
      });


    });
  }

  loadTotalPostByDay() {
    this.adminPostrepotedService.loadTotalPostReportedByDay().subscribe(() => {
      this.totalPostByDay = 0;
      this.totalPostByDay = this.adminPostrepotedService.getTotalPostReportedByDay();
    })
  }

  loadPercentPostByDayIncrease() {
    this.adminPostrepotedService.loadPercentPostReportedByDayIncrease().subscribe(() => {
      this.percentPostByDayIncrease = 0;
      this.percentPostByDayIncrease = this.adminPostrepotedService.getPercentPostReportedByDayIncrease();
    })
  }

  loadTotalPostByMonth() {
    this.adminPostrepotedService.loadTotalPostReportedByMonth().subscribe(() => {
      this.totalPostByMonth = 0;
      this.totalPostByMonth = this.adminPostrepotedService.getTotalPostReportedByMonth();
    })
  }

  loadPercentPostByMonthIncrease() {
    this.adminPostrepotedService.loadPercentPostReportedByMonthIncrease().subscribe(() => {
      this.percentPostByMonthIncrease = 0;
      this.percentPostByMonthIncrease = this.adminPostrepotedService.getPercentPostReportedByMonthIncrease();
    })
  }

  loadTotalPostByYear() {
    this.adminPostrepotedService.loadTotalPostReportedByYear().subscribe(() => {
      this.totalPostByYear = 0;
      this.totalPostByYear = this.adminPostrepotedService.getTotalPostReportedByYear();
    })
  }

  loadPercentPostByYearIncrease() {
    this.adminPostrepotedService.loadPercentPostReportedByYearIncrease().subscribe(() => {
      this.percentPostByYearIncrease = 0;
      this.percentPostByYearIncrease = this.adminPostrepotedService.getPercentPostReportedByYearIncrease();
    })
  }

  carousel() {
    $("#myCarousel").on("slide.bs.carousel", function (e: { relatedTarget: any; direction: string; }) {
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 3;
      var totalItems = $(".carousel-item").length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
          // append slides to end
          if (e.direction == "left") {
            $(".carousel-item").eq(i).appendTo(".carousel-inner");
          } else {
            var $myCarousel = $("#myCarousel");
            $(".carousel-item").eq(0).appendTo($myCarousel.find(".carousel-inner"));
          }
        }
      }
    });

  }

  openTable() {
    if (this.tablePostReport.classList.contains("hidden")) {
      this.renderer.removeClass(this.tablePostReport, "hidden");
      this.renderer.addClass(this.pagiPostReport, "hidden");
    } else {
      this.renderer.removeClass(this.pagiPostReport, "hidden");
      this.renderer.addClass(this.tablePostReport, "hidden");
    }
  }


}
