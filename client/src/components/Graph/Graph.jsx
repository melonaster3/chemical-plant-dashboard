import React, { useEffect, useState } from "react";
import LineGraph from "./Line";
import { BarGraph } from "./Bar";

export function GraphContent(props) {
  const graph = props.graph;
  const data = props.data;
  console.log(props.graphInfo);
  return (
    <>
      {graph.type && data.length > 0 && graph.timeFrame ? (
        <>
          {graph.type === "Line" && (
            <LineGraph
              type={props.graphInfo}
              data={data}
              timeFrame={graph.timeFrame}
            />
          )}
          {!graph.type && (
            <LineGraph
              type={props.graphInfo}
              data={data}
              timeFrame={graph.timeFrame}
            />
          )}
          {graph.type === "Bar" && (
            <BarGraph
              type={props.graphInfo}
              data={data}
              timeFrame={graph.timeFrame}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
