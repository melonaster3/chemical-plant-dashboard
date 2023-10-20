import React, { useEffect, useState } from "react";
import LineGraph from "./Line";
import { BarGraph } from "./Bar";
import { EmptyGraph } from "../../services/LineGraph/lineType";
import { Line } from "react-chartjs-2";
import { ScaleContent } from "./Scale";

export function GraphContent(props) {
  const graph = props.graph;
  const data = props.data;
  const emptyGraph = EmptyGraph();
  return (
    <>
      {graph.type && data.length > 0 ? (
        <>
          {graph.type === "Line" && (
            <LineGraph
              type={props.graphInfo}
              data={data}
              timeFrame={graph.timeFrame}
              setGraph={props.setGraph}
              graph={props.graph}
              setCSVData={props.setCSVData}
            />
          )}
          {graph.type === "Bar" && (
            <BarGraph
              type={props.graphInfo}
              data={data}
              timeFrame={graph.timeFrame}
              setGraph={props.setGraph}
              graph={props.graph}
              setCSVData={props.setCSVData}
            />
          )}
          {/*           <ScaleContent graph={graph} data={data} setGraph={props} />
           */}{" "}
        </>
      ) : (
        <Line data={emptyGraph.data} options={emptyGraph.options} />
      )}
    </>
  );
}
