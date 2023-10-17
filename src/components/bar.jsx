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
import { GetGraphSettings } from "../services/BarGraph/BarType";
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
  const [options, setOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const GraphSettings = GetGraphSettings(barType, dummyDatasets);
    if (GraphSettings) {
      setOptions(GraphSettings.options);
      setLabels(GraphSettings.labels);
      setChartData({});
      setChartData(GraphSettings.chartData);
    }
    setChartData(GraphSettings.chartData);
  }, [barType]);

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
