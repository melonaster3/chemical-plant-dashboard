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
import { BarGraphType, GraphTypes, LineGraphTypes } from "../services/dummy";
import { BarGraph } from "./bar";
export default function Graph() {
  const [graphType, setGraphType] = useState("");
  const [barType, setBarType] = useState("");
  const [lineType, setLineType] = useState("");

  return (
    <>
      <select
        name="GraphType"
        onChange={(e) => {
          setGraphType(e.target.value);
        }}
      >
        <option selected="selected"></option>
        {GraphTypes.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
      <br />

      {graphType === "Line" && (
        <>
          <select
            name="LineType"
            onChange={(e) => {
              setLineType(e.target.value);
            }}
          >
            <option selected="selected"></option>
            {LineGraphTypes.map(({ value, label }, index) => (
              <option key={index} value={value}>
                {label}
              </option>
            ))}
          </select>
          <LineGraph type={lineType} />
        </>
      )}

      {graphType === "Bar" && (
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
          {barType && <BarGraph type={barType} />}
        </>
      )}
    </>
  );
}
