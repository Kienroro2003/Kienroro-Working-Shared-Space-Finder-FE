import React from "react";
import Chart from "chart.js/auto";

export default function CardBarChart({ data, ...props }) {
  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: ["Admin", "User", "Owner", "Post"],
        datasets: [
          {
            label: "Number",
            backgroundColor: "#0CA3DB",
            borderColor: "#ed64a6",
            data: [
              data.NumberAdminAccount,
              data.NumberUserAccount,
              data.NumberOwnerAccount,
              data.NumberPostSpaceHadRent,
            ],
            fill: false,
            barThickness: 120,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative mb-0 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
        <div className="mb-0 rounded-t bg-transparent px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow"></div>
          </div>
        </div>
        <div className="flex-auto p-4">
          {/* Chart */}
          <div className="h-350-px relative">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
