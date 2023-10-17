import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { dummyDatasets } from "../services/dummy";
import { timestampToReadableDate } from "../services/time";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarGraph(props) {
  const barType = props.barType;

  const [options, setOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setOptions({
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
          label: (item) => `${item.yLabel} °C`,
        },
      },
      scales: {
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              return value + " °C";
            },
          },
        },
      },
    });
    setLabels(
      dummyDatasets.map((data) => {
        return timestampToReadableDate(data.timestamp);
      })
    );
    setChartData({
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: dummyDatasets.map((data) => {
            return data.temperature;
          }),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        /*   {
            label: "Dataset 2",
            data: dummyDatasets.map((data) => {
              return data.pressure;
            }),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          }, */
      ],
    });
  }, []);

  return (
    <>
      {options && labels.length > 0 && chartData ? (
        <Bar options={options} data={chartData} />
      ) : (
        <></>
      )}
    </>
  );
}
