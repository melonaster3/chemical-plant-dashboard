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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  TimeScale,
  Legend
);

export function BarGraph(props) {
  const barType = props.type;
  const timeFrame = props.timeFrame;
  const setGraph = props.setGraph;
  const graph = props.graph;

  const [options, setOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (props.data && timeFrame && barType) {
      const dataAVG = getAverage(props.data, timeFrame);
      const info = GetOverallAverage(dataAVG, barType);
      const GraphSettings = GetGraphSettings(barType, dataAVG);
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
        <Bar redraw={true} options={options} data={chartData} />
      ) : (
        <></>
      )}
    </>
  );
}
