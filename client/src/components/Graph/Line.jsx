import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale,
} from "chart.js";

import { GetOverallAverage } from "../../services/Data/dummy";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { GetGraphSettingsLine } from "../../services/LineGraph/lineType";
import { getAverage } from "../../services/Time/time";

// Register Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph(props) {
  // Extract props
  const lineType = props.type;
  const timeFrame = props.timeFrame;
  const setGraph = props.setGraph;
  const graph = props.graph;

  // State variables to store chart options, labels, and data
  const [options, setOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({});

  // Use useEffect to handle updates when props or state change
  useEffect(() => {
    // Calculate average data based on the selected time frame
    const dataAVG = getAverage(props.data, timeFrame);
    // Calculate statistics for the chart and update the graph state
    const info = GetOverallAverage(dataAVG, lineType);
    if (lineType !== "Level") {
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

    // Generate chart settings based on the selected line type and data
    const GraphSettings = GetGraphSettingsLine(
      lineType,
      dataAVG,
      graph.timeFrame
    );

    // Update state variables with chart settings, labels, and data
    if (GraphSettings) {
      setOptions(GraphSettings.options);
      setLabels(GraphSettings.labels);
      setChartData(GraphSettings.chartData);
      props.setCSVData(dataAVG);
    }
    setChartData(GraphSettings.chartData);
    props.setCSVData(dataAVG);
  }, [lineType, timeFrame, props.data, graph.timeEnd, graph.timeStart]);

  return (
    <>
      {options &&
      labels.length > 0 &&
      chartData &&
      Object.keys(chartData).length > 0 &&
      chartData.datasets.length > 0 ? (
        <Line redraw={true} options={options} data={chartData} />
      ) : (
        <></>
      )}
    </>
  );
}
