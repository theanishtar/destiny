import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';

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

  constructor(private el: ElementRef, private renderer: Renderer2) {}


  ngAfterViewInit() {
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
}
