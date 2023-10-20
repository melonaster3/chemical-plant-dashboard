import { timestampToReadableDate } from "../Time/time";
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';

export function GetGraphSettings(type, plotData,avgType) {
  
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
 
      title: {
        display: true,
        text: "Plant Bar Chart",
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
        offset: true,
        ticks: {
          maxTicksLimit: 10
        },
              grid: {
          color: 'rgba(192, 192, 192, 0.3)',
        },
/*         stacked: type === "Level" ? true : false,
 */        
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
  let labels
  if (avgType === "") {
    labels= plotData.map((data2,index) => {
      let dateSet = new Date(data2.timestamp);
      const localeOptionsDay = { year: 'numeric', month: '2-digit', day: '2-digit', };
  
      return  dateSet.toLocaleDateString(undefined, localeOptionsDay) 
    });
  } else {
    labels= plotData.map((data2,index) => {
    
      return data2.label
    });
  }
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