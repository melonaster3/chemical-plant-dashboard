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
export default function Graph() {
  const [graphType, setGraphType] = useState("");
  const [barType, setBarType] = useState("");

  return (
    <>
      <select name="States" required>
        {/*  {states.map(({ value, display }, index) => (
                            <option key={index} value={value}>
                              {display}
                            </option>
                          ))} */}
      </select>
      <BarGraph />
    </>
  );
}
