import React, { useEffect, useRef, useState } from "react";

import { GetData } from "../services/APICall";
import { Button, Grid, Input } from "@mui/material";

import { TableContent } from "./Content";
import { GraphContent } from "./Graph/Graph";
import { GraphDiv, TableContentDiv } from "./style/style";

export default function Graph() {
  const [fullData, setFullData] = useState([]);
  const [showingData, setShowingData] = useState([]);

  const [buttonPressed, setButtonPressed] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [graph, setGraph] = useState({
    type: "",
    info: "",
    timeFrame: "Weekly",
    timeStart: "",
    timeEnd: "",
    avg: "",
    max: "",
    min: "",
  });

  const handleButtonClick = () => {
    setButtonPressed(true);
  };

  useEffect(() => {
    const fetchData = () => {
      GetData()
        .then((data) => {
          const sorted = data.data.sort((a, b) => {
            const timestampA = new Date(a.timestamp);
            const timestampB = new Date(b.timestamp);
            return timestampA - timestampB;
          });
          setShowingData(sorted);
          setFullData(sorted);
          setButtonPressed(false);
        })
        .catch((error) => {
          alert(
            "Data was unable to be recieved. Please check API or Plant Status"
          );
        });
    };

    if (fullData.length === 0) {
      fetchData();
    }
    /*  const dataFetchInterval = setInterval(() => {
      fetchData();
    }, 60000);
     return () => {
      clearInterval(dataFetchInterval);
    }; */
  }, []);

  useEffect(() => {
    if (fullData.length > 0 && graph.timeEnd > graph.timeStart) {
      const startTimeMillis = Date.parse(graph.timeStart); // Convert startTime to milliseconds
      const endTimeMillis = Date.parse(graph.timeEnd); // Convert endTime to milliseconds

      const timeFrameData = fullData.filter((data) => {
        const dataTimestampMillis = Date.parse(data.timestamp); // Convert data timestamp to milliseconds
        return (
          startTimeMillis < dataTimestampMillis &&
          dataTimestampMillis < endTimeMillis
        );
      });
      setShowingData(timeFrameData);
    }
  }, [graph.timeEnd, graph.timeStart, fullData]);

  return (
    <>
      <Grid width="100%" justifyContent={"center"} container>
        <GraphDiv>
          <GraphContent
            graph={graph}
            type={graph.type}
            graphInfo={graph.info}
            data={showingData}
            timeFrame={graph.timeFrame}
            setGraph={setGraph}
            setCSVData={setCsvData}
          />
        </GraphDiv>
        <TableContentDiv>
          <TableContent
            buttonClick={handleButtonClick}
            graph={graph}
            setGraph={setGraph}
            data={csvData}
            fullData={fullData}
          />{" "}
        </TableContentDiv>
      </Grid>
    </>
  );
}
