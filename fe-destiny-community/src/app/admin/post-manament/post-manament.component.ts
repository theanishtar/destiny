import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from '../../../assets/js/admin/chart.js/chart.min.js';
import { AdminPostmanagementService } from '../service/admin-postmanagement.service';
import { AdminIndexService } from '../service/admin-index.service';
import { forEach } from 'angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-manament',
  templateUrl: './post-manament.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class PostManamentComponent implements OnInit {

  @ViewChild('myAreaChart') chartLine: ElementRef | undefined;
  @ViewChild('myPieChart') chartPie: ElementRef | undefined;

  day: any;
  month: any;
  year: any;

  listTOP4Post: any[] = [];
  listTotalPostEveryMonth: number[];
  listTOP3Product: any[];
  listNameTOP3Product: string[] = [];
  listDataTOP3Product: number[];
  product1: string;
  product2: string;
  product3: string;
  postDetail: any;

  totalPostByDay: number;
  percentPostByDayIncrease: number;

  totalPostByMonth: number;
  percentPostByMonthIncrease: number;

  totalPostByYear: number;
  percentPostByYearIncrease: number;
  isLoading = true;

  constructor(
    private adminPostmanagementService: AdminPostmanagementService,
    private adminIndexService: AdminIndexService,
    private routers: Router,
  ) { }

  ngOnInit(): void {
    this.getTime();
  }

  ngAfterViewInit() {

    this.loadTOP4Post();
    this.loadListTotalPostEveryMonth();
    this.loadTOP3Product();

    this.loadTotalPostByDay();
    this.loadTotalPostByMonth();
    this.loadTotalPostByYear();

    this.loadPercentPostByDayIncrease();
    this.loadPercentPostByMonthIncrease();
    this.loadPercentPostByYearIncrease();

  }

  getTime() {
    this.day = new Date().getDay();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  loadTotalPostByDay() {
    this.adminPostmanagementService.loadTotalPostByDay().subscribe(() => {
      this.totalPostByDay = 0;
      this.totalPostByDay = this.adminPostmanagementService.getTotalPostByDay();
    })
  }

  loadPercentPostByDayIncrease() {
    this.adminPostmanagementService.loadPercentPostByDayIncrease().subscribe(() => {
      this.percentPostByDayIncrease = 0;
      this.percentPostByDayIncrease = this.adminPostmanagementService.getPercentPostByDayIncrease();
    })
  }

  loadTotalPostByMonth() {
    this.adminPostmanagementService.loadTotalPostByMonth().subscribe(() => {
      this.totalPostByMonth = 0;
      this.totalPostByMonth = this.adminPostmanagementService.getTotalPostByMonth();
    })
  }

  loadPercentPostByMonthIncrease() {
    this.adminPostmanagementService.loadPercentPostByMonthIncrease().subscribe(() => {
      this.percentPostByMonthIncrease = 0;
      this.percentPostByMonthIncrease = this.adminPostmanagementService.getPercentPostByMonthIncrease();
    })
  }

  loadTotalPostByYear() {
    this.adminPostmanagementService.loadTotalPostByYear().subscribe(() => {
      this.totalPostByYear = 0;
      this.totalPostByYear = this.adminPostmanagementService.getTotalPostByYear();
    })
  }

  loadPercentPostByYearIncrease() {
    this.adminPostmanagementService.loadPercentPostByYearIncrease().subscribe(() => {
      this.percentPostByYearIncrease = 0;
      this.percentPostByYearIncrease = this.adminPostmanagementService.getPercentPostByYearIncrease();
    })
  }

  selectPost(id: string): void {
    localStorage.setItem("postDetailId", id);
    this.routers.navigate(['/admin/postdetail']);
  }

  selectUser(email: string): void {
    localStorage.setItem("userDetailEmail", email);
    this.routers.navigate(['/admin/userdetail']);
  }

  loadTOP4Post() {
    this.adminPostmanagementService.loadTOP4Post().subscribe(() => {
      this.listTOP4Post = [];
      this.listTOP4Post = this.adminPostmanagementService.getTOP4Post();
      this.isLoading = false;
    });
  }

  loadListTotalPostEveryMonth() {
    this.adminIndexService.loadTotalPostEveryMonth().subscribe(() => {
      this.listTotalPostEveryMonth = [];
      this.listTotalPostEveryMonth = this.adminIndexService.getListTotalPostEveryMonth();

      this.createChartLine();
    })
  }

  loadTOP3Product() {
    this.adminPostmanagementService.loadTOP3Product().subscribe(() => {
      this.listTOP3Product = [];
      this.listNameTOP3Product = [];
      this.listDataTOP3Product = [];
      this.listTOP3Product = this.adminPostmanagementService.getTOP3Product();
      const i = 0;
      this.listTOP3Product.forEach(element => {
        this.listNameTOP3Product.push(element[0]);
        this.listDataTOP3Product.push(element[1]);
      });

      this.createChartPie();
    });
  }


  createChartLine() {
    function number_format(number, decimals, dec_point, thousands_sep): string {
      number = (number + "").replace(",", "").replace(" ", "");
      const n = !isFinite(+number) ? 0 : +number;
      const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
      const sep = typeof thousands_sep === "undefined" ? "," : thousands_sep;
      const dec = typeof dec_point === "undefined" ? "." : dec_point;
      let s: string[] = [""];
      const toFixedFix = function (n: number, prec: number): string {
        const k = Math.pow(10, prec);
        return "" + Math.round(n * k) / k;
      };
      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    }

    if (this.chartLine) {
      // Area Chart Example
      var ctx = this.chartLine.nativeElement.getContext('2d');
      Chart.defaults.global.defaultFontColor = "#8fff";

      var gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);

      // Add white and transparent color stops to the gradient
      gradientStroke1.addColorStop(1, "rgba(255, 255, 255, 0.6)"); // White
      gradientStroke1.addColorStop(0.8, "rgba(255, 255, 255, 0.4)"); // Semi-transparent white
      gradientStroke1.addColorStop(0, "rgba(255, 255, 255, 0)"); // Fully transparent

      // Apply the gradient stroke to a shape's strokeStyle
      ctx.strokeStyle = gradientStroke1;

      // Draw a shape with the gradient stroke
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(60, 100);
      ctx.lineTo(250, 100);
      ctx.stroke();

      var myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Tổng ",
              lineTension: 0.3,
              backgroundColor: gradientStroke1,
              borderColor: "white",
              pointRadius: 3,
              pointBackgroundColor: "white",
              pointBorderColor: "white",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "white",
              pointHoverBorderColor: "white",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: this.listTotalPostEveryMonth,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0,
            },
          },
          scales: {
            xAxes: [
              {
                time: {
                  unit: "date",
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  maxTicksLimit: 7,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  maxTicksLimit: 5,
                  padding: 10,
                  // Include a dollar sign in the ticks
                  callback: function (value, index, values) {
                    return number_format(value, "", "", "") + " Bài đăng";
                  },
                  color: "#fff",
                },
                gridLines: {
                  color: "white",
                  zeroLineColor: "white",
                  drawBorder: false,
                  borderDash: [4],
                  zeroLineBorderDash: [2],
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: "#6e707e",
            titleFontSize: 14,
            borderColor: "#dddfeb",
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: "index",
            caretPadding: 10,
            callbacks: {
              label: function (tooltipItem, chart) {
                var datasetLabel =
                  chart.datasets[tooltipItem.datasetIndex].label || "";
                return datasetLabel + number_format(tooltipItem.yLabel, "", "", "") + " Bài đăng";
              },
            },
          },
        },
      });
    }
  }

  createChartPie() {
    //pie chart
    if (this.chartPie) {
      var ctx = this.chartPie.nativeElement.getContext('2d');
      var myPieChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.listNameTOP3Product,
          datasets: [
            {
              data: this.listDataTOP3Product,
              backgroundColor: ["#da277b", "#4e73df", "#1cc88a"],
              hoverBackgroundColor: ["#b42769", "#2e59d9", "#17a673"],
              borderColor: "black",
              hoverBorderColor: "black",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: "#dddfeb",
            borderWidth: 0,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
          legend: {
            display: false,
          },
          cutoutPercentage: 80,
        },
      });
    }
  }


}


