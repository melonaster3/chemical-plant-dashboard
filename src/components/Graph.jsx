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
import React, { useEffect, useRef } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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
};

const labels = ["day1", "day2", "day3"];

const data = {
  labels,
  datasets: [
    {
      timestamp: "2023-10-13T00:00:00Z",
      temperature: 24.5,
      pressure: 1019.8,
      level1_chemical: 74.2,
      level2_chemical: 59.8,
    },
    {
      timestamp: "2023-10-13T00:05:00Z",
      temperature: 24.7,
      pressure: 1020.0,
      level1_chemical: 74.5,
      level2_chemical: 60.0,
    },
    {
      timestamp: "2023-10-13T00:10:00Z",
      temperature: 24.8,
      pressure: 1020.2,
      level1_chemical: 74.7,
      level2_chemical: 60.2,
    },
  ],
};

export default function Graph() {
  /*   const chartRef = useRef();

  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((entry) => entry.timestamp);
      const values = data.map((entry) => entry.level1_chemical);

      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: ["#FF5733", "#FFC300", "#33FF57"], // Colors for each segment
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [data]);
 */
  return <Bar options={options} data={data} />;
}
