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
  TimeScale,
} from "chart.js";
import { GetOverallAverage, dummyDatasets } from "../../services/Data/dummy";

import { Bar, Line } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";
import { GetGraphSettingsLine } from "../../services/LineGraph/lineType";
import { getAverage } from "../../services/Time/time";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale,
  Legend
);

export default function LineGraph(props) {
  const lineType = props.type;
  const timeFrame = props.timeFrame;
  const setGraph = props.setGraph;
  const graph = props.graph;

  const [options, setOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const dataAVG = getAverage(props.data, timeFrame);
    const info = GetOverallAverage(dataAVG, lineType);
    const GraphSettings = GetGraphSettingsLine(lineType, dataAVG);
    if (GraphSettings) {
      setGraph({
        ...graph,
        avg: info.average,
        max: info.max,
        min: info.min,
      });
      setOptions(GraphSettings.options);
      setLabels(GraphSettings.labels);
      setChartData(GraphSettings.chartData);
      props.setCSVData(dataAVG);
    }
    setChartData(GraphSettings.chartData);
  }, [lineType, timeFrame, props.data]);
  props.setCSVData(dataAVG);

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
