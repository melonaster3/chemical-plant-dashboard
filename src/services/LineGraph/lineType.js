import { timestampToReadableDate } from "../time";

export function GetGraphSettingsLine(type, plotData) {
  console.log(plotData);
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    tooltips: {
      callbacks: {
        label: (item) => {
          if (type === "Temperature" || type === "TemperatureAVG") {
            return `${item.yLabel} °C`;
          } else if (type === "Pressure" || type === "PressureAVG") {
            return `${item.yLabel} kPa`;
          } else if (
            type === "Level1" ||
            type === "Level2" ||
            type === "Level" ||
            type === "LevelAVG"
          ) {
            return `${item.yLabel} L`;
          } else if (
            type === "All"
          ) {
            return `${item.yLabel}`;
          }
        },
      },
    },
    scales: {
    x: {
            stacked: type === "Level" ? true : false
          },
      y: {
        stacked: type === "Level" ? true : false,
        ticks: {
          callback: function (value, index, ticks) {
            if (type === "Temperature" || type === "TemperatureAVG") {
              return value + " °C";
            } else if (type === "Pressure" || type === "PressureAVG") {
              return value + " kPa";
            } else if (
              type === "Level1" ||
              type === "Level2" ||
              type === "Level" ||
              type === "LevelAVG"
            ) {
              return value + " L";
            } else if (
                type === "All"
              ) {
                return value               }
          },
        },
      },
    },
  };

  const labels = plotData.map((data2) => {
    return timestampToReadableDate(data2.timestamp);
  });

  let datasets = [];

 
    datasets = [
      {
        label: "Dataset 1",
        data: plotData.map((data2) => {
          if (type === "Temperature" || type === "TemperatureAVG") {
            return data2.temperature;
          } else if (type === "Pressure" || type === "PressureAVG") {
            return data2.pressure;
          } else if (type === "Level1") {
            return data2.level1_chemical;
          } else if (type === "Level2") {
            return data2.level2_chemical;
          }
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5",
      },
    ];
  

  const chartData = {
    labels,
    datasets,
  };

  return { options: commonOptions, labels, chartData };
}