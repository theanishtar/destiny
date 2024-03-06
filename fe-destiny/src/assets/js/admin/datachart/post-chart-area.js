// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#8fff";

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
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

// Area Chart Example
var ctx = document.getElementById("myAreaChart").getContext("2d");

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
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
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
              return number_format(value) + " Bài đăng";
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
          return datasetLabel + number_format(tooltipItem.yLabel) + " Bài đăng";
        },
      },
    },
  },
});
