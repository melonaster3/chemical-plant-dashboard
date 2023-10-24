import React, { useEffect, useState } from "react";
import { GetData } from "../services/APICall";
import { Grid } from "@mui/material";
import { TableContent } from "./Content";
import { GraphContent } from "./Graph/Graph";
import { GraphDiv, TableContentDiv } from "./style/style";
import { GetTimeRightNow } from "../services/Time/time";

export default function Graph() {
  // Full non formatted data from call
  const [fullData, setFullData] = useState([]);

  // Full formatted data (time, type etc..)
  const [showingData, setShowingData] = useState([]);

  // For Fetching new data
  const [buttonPressed, setButtonPressed] = useState(false);

  // For exporting to Excel

  const [csvData, setCsvData] = useState([]);

  const TimeRightNow = GetTimeRightNow();

  // Define the main graph state to show
  const [graph, setGraph] = useState({
    type: "",
    info: "",
    timeFrame: "",
    timeStart: "",
    timeEnd: TimeRightNow,
    avg: "",
    max: "",
    min: "",
    yMax: "",
    yMin: "",
  });

  const handleButtonClick = () => {
    setButtonPressed(true);
  };

  // Useeffect for calling the data from the backend
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
          setGraph({ ...graph, timeStart: sorted[0]["timestamp"] });
          setButtonPressed(false);
        })
        .catch((error) => {
          alert(
            "Data was unable to be recieved. Please check API or Plant Status"
          );
        });
    };

    // Call made when there is no data or fetch button has been pressed
    if (fullData.length === 0 || buttonPressed === true) {
      fetchData();
      setButtonPressed(false);
    }

    // Automatic data fetch every 5 minutes
    const dataFetchInterval = setInterval(() => {
      fetchData();
    }, 60000 * 5);
    return () => {
      clearInterval(dataFetchInterval);
    };
  }, [buttonPressed]);

  // Useeffect for setting the showing data (on screen), changes whenever timeframe is changed
  useEffect(() => {
    if (
      fullData.length > 0 &&
      graph.timeStart &&
      graph.timeEnd &&
      graph.timeEnd > graph.timeStart
    ) {
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
