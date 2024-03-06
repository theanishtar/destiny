import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';

import { Router } from '@angular/router';

import { AdminUserreportedService } from '../service/admin-userreported.service';

declare var $: any;

@Component({
  selector: 'app-user-reportdetail',
  templateUrl: './user-reportdetail.component.html',
  styleUrls: [
    `../css/sb-admin-2.min.css`,
    `../css/home.css`
  ],
})
export class UserReportdetailComponent implements OnInit {
  pagiUserReport!: HTMLElement;
  tableUserReport!: HTMLElement;

  day: any;
  month: any;
  year: any;

  listUserReportedByDay: any[] = [];
  listUserReportedByYear: any[] = [];

  totalUserByDay: number;
  percentUserByDayIncrease: number;

  totalUserByMonth: number;
  percentUserByMonthIncrease: number;

  totalUserByYear: number;
  percentUserByYearIncrease: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private adminUserReportedService: AdminUserreportedService,
    private routers: Router,

  ) { }

  ngOnInit(): void {
    this.getTime();
  }

  ngAfterViewInit() {
    this.carousel();
    this.loadListUserReportedByDay();
    this.loadListUserReportedByYear();
    this.loadTotalUserByDay();
    this.loadTotalUserByMonth();
    this.loadTotalUserByYear();
    this.loadPercentUserByDayIncrease();
    this.loadPercentUserByMonthIncrease();
    this.loadPercentUserByYearIncrease();

    this.pagiUserReport = this.el.nativeElement.querySelector("#pagi-user-report");
    this.tableUserReport = this.el.nativeElement.querySelector("#table-user-report");

  }

  selectPost(id: string): void {
    localStorage.setItem("PostDetailId", id);
    this.routers.navigate(['/admin/Userdetail']);
  }

  selectUser(email: string): void {
    localStorage.setItem("userDetailEmail", email);
    this.routers.navigate(['/admin/userdetail']);
  }

  getTime() {
    this.day = new Date().getDate();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  loadListUserReportedByDay() {
    this.adminUserReportedService.loadListUserReportedByDay().subscribe(() => {
      this.listUserReportedByDay = [];
      this.listUserReportedByDay = this.adminUserReportedService.getListUserReportedByDay();
    });
  }

  loadListUserReportedByYear() {
    this.adminUserReportedService.loadListUserReportedByYear().subscribe(() => {
      this.listUserReportedByYear = [];
      this.listUserReportedByYear = this.adminUserReportedService.getListUserReportedByYear();

      $e(document).ready(function () {
        $e('#dataTable').DataTable();
      });

    });
  }

  loadTotalUserByDay() {
    this.adminUserReportedService.loadTotalUserReportedByDay().subscribe(() => {
      this.totalUserByDay = 0;
      this.totalUserByDay = this.adminUserReportedService.getTotalUserReportedByDay();
    })
  }

  loadPercentUserByDayIncrease() {
    this.adminUserReportedService.loadPercentUserReportedByDayIncrease().subscribe(() => {
      this.percentUserByDayIncrease = 0;
      this.percentUserByDayIncrease = this.adminUserReportedService.getPercentUserReportedByDayIncrease();
    })
  }

  loadTotalUserByMonth() {
    this.adminUserReportedService.loadTotalUserReportedByMonth().subscribe(() => {
      this.totalUserByMonth = 0;
      this.totalUserByMonth = this.adminUserReportedService.getTotalUserReportedByMonth();
    })
  }

  loadPercentUserByMonthIncrease() {
    this.adminUserReportedService.loadPercentUserReportedByMonthIncrease().subscribe(() => {
      this.percentUserByMonthIncrease = 0;
      this.percentUserByMonthIncrease = this.adminUserReportedService.getPercentUserReportedByMonthIncrease();
    })
  }

  loadTotalUserByYear() {
    this.adminUserReportedService.loadTotalUserReportedByYear().subscribe(() => {
      this.totalUserByYear = 0;
      this.totalUserByYear = this.adminUserReportedService.getTotalUserReportedByYear();
    })
  }

  loadPercentUserByYearIncrease() {
    this.adminUserReportedService.loadPercentUserReportedByYearIncrease().subscribe(() => {
      this.percentUserByYearIncrease = 0;
      this.percentUserByYearIncrease = this.adminUserReportedService.getPercentUserReportedByYearIncrease();
    })
  }

  carousel() {
    $(document).ready(function () {
      $("#myCarousel").on("slide.bs.carousel", function (e) {
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
              let $myCarousel = $("#myCarousel");
              $(".carousel-item").eq(0).appendTo($myCarousel.find(".carousel-inner"));
            }
          }
        }
      });
    });

  }

  openTable() {
    if (this.tableUserReport.classList.contains("hidden")) {
      this.renderer.removeClass(this.tableUserReport, "hidden");
      this.renderer.addClass(this.pagiUserReport, "hidden");
    } else {
      this.renderer.removeClass(this.pagiUserReport, "hidden");
      this.renderer.addClass(this.tableUserReport, "hidden");
    }
  }
}
