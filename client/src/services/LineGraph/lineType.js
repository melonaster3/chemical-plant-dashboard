import { timestampToReadableDate } from "../Time/time";
import {de} from 'date-fns/locale';
import "chartjs-adapter-date-fns";

export function GetGraphSettingsLine(type, plotData) {
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
            type === "LevelAVG"||
            type === "LevelCombined"
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
      offset: true,
      maxTicksLimit: 5,
      autoSkip: true,   // Allow automatic skipping of ticks
      autoSkipPadding: 10, // Padding around the ticks
            stacked: type === "Level" ? true : false,
      grid: {
        color: 'rgba(192, 192, 192, 0.3)',
      },
    },
      y: {
        stacked: type === "Level" ? true : false,
        grid: {
          color: 'rgba(192, 192, 192, 0.3)', 
        },
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
              type === "LevelAVG" ||
              type === "LevelCombined"
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
  if(type === "Level") {
    datasets = [
      {
        label: "Dataset 1",
        data: plotData.map((data2) => {
        
            return data2.level1_chemical;
          }),
        
        backgroundColor: "rgba(255, 99, 132, 0.5",
        borderColor: 'rgba(192, 192, 192, 0.3)', 
      },
      {
        label: "Dataset 1",
        data: plotData.map((data2) => {
        
            return data2.level2_chemical;
          }),
        
          backgroundColor: "rgba(54, 162, 235, 0.5)",           borderColor: 'rgba(192, 192, 192, 0.3)', 
        },
    ];
  } else if(type === "LevelCombined") {
    datasets = [
      {
        label: "Dataset 1",
        data: plotData.map((data2) => {
            return Number(data2.level1_chemical) + Number(data2.level2_chemical) ;
          }),
        backgroundColor: "rgba(255, 99, 132, 0.5",         borderColor: 'rgba(192, 192, 192, 0.3)', 

      },
      
    ];
  }
  else if (type === "All") {
    datasets = [
      {
        label: "Temperature",
        data: plotData.map((data2) => {
          return data2.temperature
        }
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5",         borderColor: 'rgba(192, 192, 192, 0.3)', 

      },
      {
        label: "Pressure",
        data: plotData.map((data2) => {
          return data2.pressure
        }
        ),
        backgroundColor: "rgba(155, 20, 32, 0.5",         borderColor: 'rgba(192, 192, 192, 0.3)', 

      },
      {
        label: "Chemical1 Level",
        data: plotData.map((data2) => {
          return data2.level1_chemical
        }
        ),
        backgroundColor: "rgba(5, 120, 99, 0.5",         borderColor: 'rgba(192, 192, 192, 0.3)', 

      },
      {
        label: "Chemical2 Level",
        data: plotData.map((data2) => {
          return data2.level2_chemical
        }
        ),
        backgroundColor: "rgba(150, 0, 200, 0.5",         borderColor: 'rgba(192, 192, 192, 0.3)', 

      },
      {
        label: "Combined Level",
        data: plotData.map((data2) => {
          return Number(data2.level1_chemical) + Number(data2.level2_chemical) ;
        }
        ),
        backgroundColor: "rgba(150, 29, 2, 0.5",         borderColor: 'rgba(192, 192, 192, 0.3)', 

      },
    ];
  }
  else {
    datasets = [
      {
        label: "Dataset 1",
        data: plotData.map((data2) => {
          if (type === "Temperature" || type === "TemperatureAVG") {
            return data2.temperature
          } else if (type === "Pressure" || type === "PressureAVG") {
            return data2.pressure;
          } else if (type === "Level1") {
            return data2.level1_chemical;
          } else if (type === "Level2") {
            return data2.level2_chemical;
          }
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5",        borderColor: 'rgba(192, 192, 192, 0.3)', 

      },
    ];
  
  }
   

  const chartData = {
    labels,
    datasets,
  };

  return { options: commonOptions, labels, chartData };
}


export const EmptyGraph = () => {
  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        min: 0,
        max: 100,
      },
    },
  };
  const data = {
    labels: [],
    datasets: [
      {
        label: 'Empty Dataset',
        data: [],
        borderColor: 'rgba(0, 0, 0, 0)', // Transparent line color
        backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent fill color
      },
    ],
  };
  return {data,options}
}