import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { Chart } from '../../../assets/js/admin/chart.js/chart.min.js';

@Component({
  selector: 'app-post-manament',
  templateUrl: './post-manament.component.html',
  styleUrls: [ `../css/sb-admin-2.min.css`,`../css/home.css`],
})
export class PostManamentComponent  {

  @ViewChild('myAreaChart') chartLine: ElementRef | undefined;
  @ViewChild('myPieChart') chartPie: ElementRef | undefined;

  ngAfterViewInit() {

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

      var gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);

      // Add white and transparent color stops to the gradient
      gradientStroke1.addColorStop(1, "rgba(255, 255, 255, 1)"); // White
      gradientStroke1.addColorStop(0.8, "rgba(255, 255, 255, 0.5)"); // Semi-transparent white
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
          labels: ["Jan", "Feb","Mar", "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",],
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
              data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 100],
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

    //pie chart
    if(this.chartPie){
      var ctx = this.chartPie.nativeElement.getContext('2d');
      var myPieChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Direct", "Referral", "Social"],
          datasets: [
            {
              data: [55, 30, 15],
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


