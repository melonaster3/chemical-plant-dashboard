import { timestampToReadableDate } from "../Time/time";
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';

export function GetGraphSettings(type, plotData) {
  
function average(ctx) {
  const values = ctx.chart.data.datasets[0].data;
  return values.reduce((a, b) => a + b, 0) / values.length;
}
function average(ctx) {
  const values = ctx.chart.data.datasets[0].data;
  return values.reduce((a, b) => a + b, 0) / values.length;
}
  const annotation = {
    type: 'line',
    borderColor: 'white',
    borderDash: [6, 6],
    borderDashOffset: 0,
    borderWidth: 3,
    label: {
      enabled: true,
      content: (ctx) => 'Average: ' + average(ctx).toFixed(2),
      position: 'end'
    },
    scaleID: 'y',
    value: (ctx) => average(ctx)
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
     /*  annotation : {
        annotations : {
          annotation
        }
      }, */
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
      tooltip: {
        callbacks: {
       
          label: (item) => {
         
            if (type === "Temperature") {
              return `${item.formattedValue} °C`;
            } else if (type === "Pressure") {
              return `${item.formattedValue} kPa`;
            } else if (
              type === "Level1" ||
              type === "Level2" ||
              type === "Level" ||
              type === "LevelAVG"
            ) {
              return `${item.formattedValue} L`;
            } else if (
              type === "All"
            ) {
              return`${item.formattedValue}`;
            }
          },
        },
    },
  },
    scales: {
    x: {
          
            stacked: type === "Level" ? true : false,
            title: {
              display: true,
              text: `
            Time
              `,
              font: {
                size: 14,
                weight: 'bold',
              },
            },
            grid: {
              color: 'rgba(192, 192, 192, 0.3)', 
            },
          
          },
      y: {
        title: {
          display: true,
          text: `
          ${type === "Temperature" ? "Temperature (°C)" : ''}
          ${type === "Pressure" ? "Pressure (kPa)" : ''}
          ${type.includes("Level") ? "Level (L)" : ''}
          ${type === "All" ? "All" : ''}
          `,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(192, 192, 192, 0.3)', 
        },
        stacked: type === "Level" ? true : false,
        ticks: {
          callback: function (value, index, ticks) {
            if (type === "Temperature") {
              return value + " °C";
            } else if (type === "Pressure" ) {
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
    return data2.label
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
        label: `
        ${type === "Temperature" ? "Temperature" : ""}
        ${type === "Pressure" ? "Pressure" : ""}
        ${type === "Level1" ? "Level1" : ""}
        ${type === "Level2" ? "Level2" : ""}
        `,
        data: plotData.map((data2) => {
          if (type === "Temperature" ) {
            return data2.temperature;
          } else if (type === "Pressure" ) {
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