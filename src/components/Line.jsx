import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import React, { useEffect, useRef } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["day1", "day2", "day3"];

const dummyDatasets = [
  {
    timestamp: "2023-10-13T00:00:00Z",
    temperature: 24.5,
    pressure: 1019.8,
    level1_chemical: 74.2,
    level2_chemical: 59.8,
    data: 1,
    label: "First Data",
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    timestamp: "2023-10-13T00:05:00Z",
    temperature: 24.7,
    pressure: 1020.0,
    level1_chemical: 74.5,
    level2_chemical: 60.0,
    data: 2,
    label: "Second Data",

    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    timestamp: "2023-10-13T00:10:00Z",
    temperature: 24.8,
    pressure: 1020.2,
    level1_chemical: 74.7,
    level2_chemical: 60.2,
    data: 3,
    label: "Third Data",

    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
];

const data = {
  labels,
  datasets: [
    {
      data: dummyDatasets.map((data2) => {
        return data2.level1_chemical;
      }),
      label: "Level 1 Chemical ",
      borderColor: "rgb(155, 50, 100)",
      backgroundColor: "rgba(155, 50, 100, 0.5)",
    },
    {
      data: dummyDatasets.map((data2) => {
        return data2.level2_chemical;
      }),
      label: "Level 2 Chemical",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function LineGraph() {
  return <Line options={options} data={data} />;
}
