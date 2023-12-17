import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';

import { Router } from '@angular/router';


declare var $: any;


@Component({
  selector: 'app-moder-management',
  templateUrl: './moder-management.component.html',
  styleUrls: [
    `../css/sb-admin-2.min.css`,
    `../css/home.css`
  ],
})
export class ModerManagementComponent {
  pagiModerator!: HTMLElement;
  tableModerator!: HTMLElement;

  day: any;
  month: any;
  year: any;

  listModerator: any[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private routers: Router,

  ) { }
  ngOnInit(): void {
    this.getTime();
  }

  ngAfterViewInit() {
    this.carousel();
    this.loadListModerator();

    this.pagiModerator = this.el.nativeElement.querySelector("#pagi-moderator");
    this.tableModerator = this.el.nativeElement.querySelector("#table-moderator");

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

  loadListModerator() {
    // this.adminUserReportedService.loadListUserReportedByYear().subscribe(() => {
    //   this.listModerator = [];
    //   this.listModerator = this.adminUserReportedService.getListUserReportedByYear();

    //   $e(document).ready(function () {
    //     $e('#dataTable').DataTable();
    //   });

    // });
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
    if (this.tableModerator.classList.contains("hidden")) {
      this.renderer.removeClass(this.tableModerator, "hidden");
      this.renderer.addClass(this.pagiModerator, "hidden");
    } else {
      this.renderer.removeClass(this.pagiModerator, "hidden");
      this.renderer.addClass(this.tableModerator, "hidden");
    }
  }





}
