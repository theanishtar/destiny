import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from '../../../assets/js/admin/chart.js/chartjs.min.js';
import { AdminIndexService } from '../service/admin-index.service';


@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class IndexAdminComponent {

  @ViewChild('chartLine') chartLine: ElementRef | undefined;
  @ViewChild('chartBars') chartBars: ElementRef | undefined;

  totalPost: number;
  totalUser: number;
  totalPostReported: number;
  totalUserReported: number;
  percentPostIncrease: number;
  percentUserIncrease: number;
  percentPostReportedIncrease: number;
  percentUserReportedIncrease: number;

  year: any;

  percentPost: number;
  percentPostString: string;
  listTotalPostEveryMonth: number[];
  listTotalUserEveryMonth: number[];
  listInteraction: number[];
  percentUserInteractionIncrease: number;

  constructor(
    private adminIndexService: AdminIndexService
  ) { }

  ngOnInit(): void {
    this.getYear();
  }

  ngAfterViewInit() {
    this.loadTotalPost();
    this.loadTotalUser();
    this.loadTotalPostReported();
    this.loadTotalUserReported();
    this.loadPercentPostIncrease();
    this.loadPercentUserIncrease();
    this.loadPercentPostReportedIncrease();
    this.loadPercentUserReportedIncrease();
    this.loadPercentPost();
    this.loadListTotalPostEveryMonth();
    this.loadListTotalUserEveryMonth();
    this.loadInteraction();
    this.loadPercentUserInteractionIncrease();

  }

  getYear() {
    this.year = new Date().getFullYear();
  }

  loadTotalPost() {
    this.adminIndexService.loadTotalPost().subscribe(() => {
      this.totalPost = 0;
      this.totalPost = this.adminIndexService.getTotalPost();


    })
  }

  loadTotalUser() {
    this.adminIndexService.loadTotalUser().subscribe(() => {
      this.totalUser = 0;
      this.totalUser = this.adminIndexService.getTotalUser();

    })
  }

  loadTotalPostReported() {
    this.adminIndexService.loadTotalPostReported().subscribe(() => {
      this.totalPostReported = 0;
      this.totalPostReported = this.adminIndexService.getTotalPostReported();

    })
  }

  loadTotalUserReported() {
    this.adminIndexService.loadTotalUserReported().subscribe(() => {
      this.totalUserReported = 0;
      this.totalUserReported = this.adminIndexService.getTotalUserReported();

    })
  }

  loadPercentPostIncrease() {
    this.adminIndexService.loadPercentPostIncrease().subscribe(() => {
      this.percentPostIncrease = 0;
      this.percentPostIncrease = this.adminIndexService.getPercentPostIncrease();
    })
  }

  loadPercentUserIncrease() {
    this.adminIndexService.loadPercentUserIncrease().subscribe(() => {
      this.percentUserIncrease = 0;
      this.percentUserIncrease = this.adminIndexService.getPercentUserIncrease();
    })
  }


  loadPercentPostReportedIncrease() {
    this.adminIndexService.loadPercentPostReportedIncrease().subscribe(() => {
      this.percentPostReportedIncrease = 0;
      this.percentPostReportedIncrease = this.adminIndexService.getPercentPostReportedIncrease();
    })
  }


  loadPercentUserReportedIncrease() {
    this.adminIndexService.loadPercentUserReportedIncrease().subscribe(() => {
      this.percentUserReportedIncrease = 0;
      this.percentUserReportedIncrease = this.adminIndexService.getPercentUserReportedIncrease();
    })
  }

  loadPercentPost() {
    this.adminIndexService.loadPercent().subscribe(() => {
      this.percentPost = 0;
      this.percentPost = this.adminIndexService.getPercentPostSendSuccess();
      this.percentPostString = this.percentPost + "%";
    })
  }

  loadListTotalPostEveryMonth() {
    this.adminIndexService.loadTotalPostEveryMonth().subscribe(() => {
      this.listTotalPostEveryMonth = [];
      this.listTotalPostEveryMonth = this.adminIndexService.getListTotalPostEveryMonth();
    })
  }

  loadListTotalUserEveryMonth() {
    this.adminIndexService.loadTotalUserEveryMonth().subscribe(() => {
      this.listTotalUserEveryMonth = [];
      this.listTotalUserEveryMonth = this.adminIndexService.getListTotalUserEveryMonth();
    })
  }

  loadInteraction() {
    this.adminIndexService.loadInteraction().subscribe(() => {
      this.listInteraction = [];
      this.listInteraction = this.adminIndexService.getInteraction();

      this.createChartLine();
      this.createChartBar();

    })
  }

  loadPercentUserInteractionIncrease() {
    this.adminIndexService.loadPercentUserInteractionIncrease().subscribe(() => {
      this.percentUserInteractionIncrease = 0;
      this.percentUserInteractionIncrease = this.adminIndexService.getPercentUserInteraction();

    })
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
                data: this.listTotalPostEveryMonth,

              },
              {
                label: "Người dùng",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#3A416F",
                borderWidth: 3,
                backgroundColor: gradientStroke2,
                fill: true,
                data: this.listTotalUserEveryMonth,
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

  createChartBar() {
    // chart bar
    if (this.chartBars) {
      try {
        const ctx = this.chartBars.nativeElement.getContext('2d');
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Hoạt động",
                tension: 0.4,
                borderWidth: 0,
                borderRadius: 4,
                borderSkipped: false,
                backgroundColor: "#fff",
                data: this.listInteraction,
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


