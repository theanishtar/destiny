import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';

declare var $: any;

@Component({
  selector: 'app-user-reportdetail',
  templateUrl: './user-reportdetail.component.html',
  styleUrls: [
    `../css/sb-admin-2.min.css`,
    `../css/home.css`
  ],
})
export class UserReportdetailComponent {
  pagiPostReport!: HTMLElement;
  tablePostReport!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}


  ngAfterViewInit() {

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

    $e(document).ready(function () {
      $e('#dataTable').DataTable();
    });


    this.truncateText(".text-substring", 50);
    this.pagiPostReport = this.el.nativeElement.querySelector("#pagi-post-report");
    this.tablePostReport = this.el.nativeElement.querySelector("#table-post-report");

  }

  private truncateText(selector: string, maxLength: number) {
    const elements = this.el.nativeElement.querySelectorAll(selector);

    elements.forEach((element: HTMLElement) => {
      const originalText = element.textContent;

      if ((originalText as any).length > maxLength) {
        this.renderer.setProperty(
          element,
          'textContent',
          (originalText as any).substring(0, maxLength - 3) + '...'
        );
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
