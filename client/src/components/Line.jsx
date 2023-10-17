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
import { dummyDatasets } from "../services/dummy";

import { Bar, Line } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";
import { GetGraphSettingsLine } from "../services/LineGraph/lineType";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph(props) {
  const lineType = props.type;
  const [options, setOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const GraphSettings = GetGraphSettingsLine(lineType, props.data);
    if (GraphSettings) {
      setOptions(GraphSettings.options);
      setLabels(GraphSettings.labels);
      setChartData(GraphSettings.chartData);
    }
    setChartData(GraphSettings.chartData);
  }, [lineType]);

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
