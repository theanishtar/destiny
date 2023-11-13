import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from '../../../assets/js/admin/chart.js/chartjs.min.js';
import { AdminUsermanagementService } from '../service/admin-usermanagement.service';
import { AdminIndexService } from '../service/admin-index.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-manament',
  templateUrl: './user-manament.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class UserManamentComponent implements OnInit {
  @ViewChild('chartline') chartLine: ElementRef | undefined;

  listTOP4User: any[] = [{}, {}, {}, {}];
  listTotalUserEveryMonth: number[];

  day: any;
  month: any;
  year: any;

  totalUserByDay: number;
  percentUserByDayIncrease: number;

  totalUserByMonth: number;
  percentUserByMonthIncrease: number;

  totalUserByYear: number;
  percentUserByYearIncrease: number;

  isLoading = true;

  constructor(
    private adminUsermanagementService: AdminUsermanagementService,
    private adminIndexService: AdminIndexService,
    private routers: Router,
  ) { }

  ngOnInit(): void {
    this.getTime();
  }

  ngAfterViewInit() {
    this.loadTOP4User();
    this.loadListTotalUserEveryMonth();

    this.loadTotalUserByDay();
    this.loadTotalUserByMonth();
    this.loadTotalUserByYear();

    this.loadPercentUserByDayIncrease();
    this.loadPercentUserByMonthIncrease();
    this.loadPercentUserByYearIncrease();
  }

  getTime() {
    this.day = new Date().getDay();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  loadTotalUserByDay() {
    this.adminUsermanagementService.loadTotalUserByDay().subscribe(() => {
      this.totalUserByDay = 0;
      this.totalUserByDay = this.adminUsermanagementService.getTotalUserByDay();
    })
  }

  loadPercentUserByDayIncrease() {
    this.adminUsermanagementService.loadPercentUserByDayIncrease().subscribe(() => {
      this.percentUserByDayIncrease = 0;
      this.percentUserByDayIncrease = this.adminUsermanagementService.getPercentUserByDayIncrease();
    })
  }

  loadTotalUserByMonth() {
    this.adminUsermanagementService.loadTotalUserByMonth().subscribe(() => {
      this.totalUserByMonth = 0;
      this.totalUserByMonth = this.adminUsermanagementService.getTotalUserByMonth();
    })
  }

  loadPercentUserByMonthIncrease() {
    this.adminUsermanagementService.loadPercentUserByMonthIncrease().subscribe(() => {
      this.percentUserByMonthIncrease = 0;
      this.percentUserByMonthIncrease = this.adminUsermanagementService.getPercentUserByMonthIncrease();
    })
  }

  loadTotalUserByYear() {
    this.adminUsermanagementService.loadTotalUserByYear().subscribe(() => {
      this.totalUserByYear = 0;
      this.totalUserByYear = this.adminUsermanagementService.getTotalUserByYear();
    })
  }

  loadPercentUserByYearIncrease() {
    this.adminUsermanagementService.loadPercentUserByYearIncrease().subscribe(() => {
      this.percentUserByYearIncrease = 0;
      this.percentUserByYearIncrease = this.adminUsermanagementService.getPercentUserByYearIncrease();
    })
  }


  selectUser(email: string): void {
    localStorage.setItem("userDetailEmail", email);
    this.routers.navigate(['/admin/userdetail']);
  }

  loadTOP4User() {
    this.adminUsermanagementService.loadTOP4User().subscribe(() => {
      this.listTOP4User = [];
      this.listTOP4User = this.adminUsermanagementService.getTOP4User();
      this.isLoading = false;
    });
  }

  loadListTotalUserEveryMonth() {
    this.adminIndexService.loadTotalUserEveryMonth().subscribe(() => {
      this.listTotalUserEveryMonth = [];
      this.listTotalUserEveryMonth = this.adminIndexService.getListTotalUserEveryMonth();

      this.createChartLine();
    })
  }

  createChartLine() {
    if (this.chartLine) {
      var ctx1 = this.chartLine.nativeElement.getContext('2d');

      var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

      gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
      gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
      gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");
      var userChart = new Chart(ctx1, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Người dùng",
              tension: 0.4,
              pointRadius: 0,
              borderColor: "#5e72e4",
              backgroundColor: gradientStroke1,
              borderWidth: 3,
              fill: true,
              data: this.listTotalUserEveryMonth,
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
                  weight: "bold",
                },
                color: "#5e72e4",
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

    }
  }

}
