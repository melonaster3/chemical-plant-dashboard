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
import {
  BarGraphType,
  GraphTypes,
  LineGraphTypes,
  timeFrameSelection,
} from "../services/Data/types";
import { BarGraph } from "./Bar";
import { GetData } from "../services/APICall";

export default function Graph() {
  const [graphType, setGraphType] = useState("");
  const [barType, setBarType] = useState("");
  const [lineType, setLineType] = useState("");
  const [fullData, setFullData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("Weekly");
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleButtonClick = () => {
    setButtonPressed(true);
  };

  useEffect(() => {
    const fetchData = () => {
      GetData().then((data) => {
        const sorted = data.data.sort((a, b) => {
          const timestampA = new Date(a.timestamp);
          const timestampB = new Date(b.timestamp);
          return timestampA - timestampB;
        });
        setFullData(sorted);
        setButtonPressed(false);
      });
    };
    fetchData();
    const dataFetchInterval = setInterval(() => {
      fetchData();
    }, 30000); // 30 seconds
    return () => {
      clearInterval(dataFetchInterval);
    };
  }, []);

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

      <button onClick={handleButtonClick}>Fetch Data Now</button>
      <br />
      <select
        name="TimeFrame"
        onChange={(e) => {
          setTimeFrame(e.target.value);
        }}
      >
        <option selected="selected"></option>
        {timeFrameSelection.map(({ value, label }, index) => (
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
          {lineType && (
            <LineGraph type={lineType} data={fullData} timeFrame={timeFrame} />
          )}
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
          {barType && (
            <BarGraph type={barType} data={fullData} timeFrame={timeFrame} />
          )}
        </>
      )}
    </>
  );
}
