import { timestampToReadableDate } from "../time";

export function GetGraphSettings(type, plotData) {
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
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

  if (type === "Level") {
    // For "Level" type, create two datasets for Level1 and Level2
    datasets = [
      {
        label: "Level1",
        data: plotData.map((data2) => {
          return data2.level1_chemical;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5",
      },
      {
        label: "Level2",
        data: plotData.map((data2) => {
          return data2.level2_chemical;
        }),
        backgroundColor: "rgba(54, 162, 235, 0.5",
      },
    ];
  }else if (type === "All") {
    // For other types, create a single dataset
    datasets = [
        {
          label: "Level1",
          data: plotData.map((data2) => {
            return data2.level1_chemical;
          }),
          backgroundColor: "rgba(255, 99, 132, 0.5",
        },
        {
          label: "Level2",
          data: plotData.map((data2) => {
            return data2.level2_chemical;
          }),
          backgroundColor: "rgba(54, 162, 235, 0.5",
        },
        {
          label: "Temperature",
          data: plotData.map((data2) => {
            return data2.temperature;
          }),
          backgroundColor: "rgba(20, 12, 235, 0.5",
        },
        {
          label: "Pressure",
          data: plotData.map((data2) => {
            return data2.pressure;
          }),
          backgroundColor: "rgba(100, 22, 235, 0.5",
        },
      ];
  }
  
  
  else {
    // For other types, create a single dataset
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
  }

  const chartData = {
    labels,
    datasets,
  };

  return { options: commonOptions, labels, chartData };
}