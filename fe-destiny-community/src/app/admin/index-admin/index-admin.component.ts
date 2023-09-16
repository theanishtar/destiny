import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import '../../../assets/js/admin/chart.js/chartjs.min.js';
import {Chart} from '../../../assets/js/admin/chart.js/chartjs.min.js';


@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class IndexAdminComponent{

  @ViewChild('chartLine') chartLine: ElementRef | undefined;
  @ViewChild('chartBars') chartBars: ElementRef | undefined;


  constructor() { }

  ngAfterViewInit() {

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
            labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Mobile apps",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#cb0c9f",
                borderWidth: 3,
                backgroundColor: gradientStroke1,
                fill: true,
                data: [50, 40, 300, 220, 500, 250, 400, 230, 500],

              },
              {
                label: "Websites",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#3A416F",
                borderWidth: 3,
                backgroundColor: gradientStroke2,
                fill: true,
                data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
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

    // chart bar

    if (this.chartBars) {
      try {
        const ctx = this.chartBars.nativeElement.getContext('2d');
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Sales",
                tension: 0.4,
                borderWidth: 0,
                borderRadius: 4,
                borderSkipped: false,
                backgroundColor: "#fff",
                data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                maxBarThickness: 6,
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
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                },
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 500,
                  beginAtZero: true,
                  padding: 15,
                  font: {
                    size: 14,
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2,
                  },
                  color: "#fff",
                },
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                },
                ticks: {
                  display: false,
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


