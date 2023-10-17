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
import React, { useEffect, useRef, useState } from "react";
import LineGraph from "./Line";
import { BarGraph } from "./Bar";
import { BarGraphType } from "../services/dummy";
export default function Graph() {
  const [graphType, setGraphType] = useState("");
  const [barType, setBarType] = useState("");

  return (
    <>
      <select
        name="BarType"
        onChange={(e) => {
          setBarType(e.target.value);
        }}
      >
        <option selected="selected"></option>
        {BarGraphType.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
      <BarGraph type={barType} />
    </>
  );
}
