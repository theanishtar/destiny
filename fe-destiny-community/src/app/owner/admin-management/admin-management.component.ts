import { Component, ElementRef, ViewChild } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';
import { Chart } from '../../../assets/js/admin/chart.js/chartjs.min.js';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: [
    `../css/sb-admin-2.min.css`,
    `../css/owner.css`
  ],
})
export class AdminManagementComponent {
  @ViewChild('chartLine') chartLine: ElementRef | undefined;

  ngAfterViewInit() {
    $e(document).ready(function () {
      $e('#dataTable').DataTable();
    });

    this.createChartLine();
  }

  createChartLine() {
    // chartline
    if (this.chartLine) {
      try {
        const ctx2 = this.chartLine.nativeElement.getContext('2d');

        const gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);
        gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
        gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
        gradientStroke1.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

        const gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);
        gradientStroke2.addColorStop(1, "rgba(20,23,39,0.2)");
        gradientStroke2.addColorStop(0.2, "rgba(72,72,176,0.0)");
        gradientStroke2.addColorStop(0, "rgba(20,23,39,0)"); //purple colors

        const gridOptions: any = {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
        };

        const gridOptions2: any = {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5],
        };

        const newChart = new Chart(ctx2, {
          type: 'line',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Bài đăng",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#cb0c9f",
                borderWidth: 3,
                backgroundColor: gradientStroke1,
                fill: true,
                // data: this.listTotalPostEveryMonth,
                data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
              },
              {
                label: "Người dùng",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#3A416F",
                borderWidth: 3,
                backgroundColor: gradientStroke2,
                fill: true,
                // data: this.listTotalUserEveryMonth,
                data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
            scales: {
              y: {
                beginAtZero: true, // Start the y-axis at 0
                grid: gridOptions,
                ticks: {
                  display: true,
                  padding: 10,
                  color: "#b2b9bf",
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
              x: {
                grid: gridOptions2,
                ticks: {
                  display: true,
                  color: "#b2b9bf",
                  padding: 20,
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        console.error('Chart creation error:', error);
      }
    }
  }
}
