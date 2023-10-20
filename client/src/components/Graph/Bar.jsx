import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { GetGraphSettings } from "../../services/BarGraph/BarType";
import { getAverage } from "../../services/Time/time";
import { GetOverallAverage } from "../../services/Data/dummy";

// Register Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  TimeScale,
  Legend
);

// Define the BarGraph component
export function BarGraph(props) {
  // Extract props
  const barType = props.type;
  const timeFrame = props.timeFrame;
  const setGraph = props.setGraph;
  const graph = props.graph;

  // State variables to store chart options, labels, and data
  const [options, setOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({});

  // Use useEffect to handle updates when props or state change
  useEffect(() => {
    if (props.data && barType) {
      // Calculate average data based on the selected time frame
      const dataAVG = getAverage(props.data, timeFrame);

      // Calculate statistics for the chart and update the graph state
      const info = GetOverallAverage(dataAVG, barType);
      if (barType !== "Level") {
        setGraph({
          ...graph,
          avg: info.average,
          max: info.max,
          min: info.min,
        });
      } else {
        setGraph({
          ...graph,
          avg: info.avgLevel,
          max: info.levelMax,
          min: info.levelMin,
        });
      }

      // Generate chart settings based on the bar type and data
      const GraphSettings = GetGraphSettings(barType, dataAVG, graph.timeFrame);

      // Update state variables with chart settings, labels, and data
      if (GraphSettings) {
        setOptions(GraphSettings.options);
        setLabels(GraphSettings.labels);
        setChartData(GraphSettings.chartData);
        props.setCSVData(dataAVG);
      }
      setChartData(GraphSettings.chartData);
      props.setCSVData(dataAVG);
    }
  }, [barType, timeFrame, props.data, graph.timeEnd, graph.timeStart]);

  return (
    <>
      {options &&
      labels.length > 0 &&
      chartData &&
      Object.keys(chartData).length > 0 &&
      chartData.datasets.length > 0 ? (
        // Render the Bar chart component with options and data
        <Bar redraw={true} options={options} data={chartData} />
      ) : (
        <></>
      )}
    </>
  );
}
