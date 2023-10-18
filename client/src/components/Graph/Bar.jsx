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

import { GetGraphSettings } from "../../services/BarGraph/BarType";
import { getAverage } from "../../services/Time/time";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarGraph(props) {
  const barType = props.type;
  const timeFrame = props.timeFrame;
  const [options, setOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const dataAVG = getAverage(props.data, timeFrame);
    const GraphSettings = GetGraphSettings(barType, dataAVG);
    if (GraphSettings) {
      setOptions(GraphSettings.options);
      setLabels(GraphSettings.labels);
      setChartData(GraphSettings.chartData);
    }
    setChartData(GraphSettings.chartData);
  }, [barType, timeFrame, props.data]);

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
