import React, { useEffect, useState } from "react";
import LineGraph from "./Line";
import { BarGraph } from "./Bar";

export function GraphContent(props) {
  const barType = props.type;
  const timeFrame = props.timeFrame;
  const graph = props.graph;
  const data = props.data;
  console.log(graph.type);
  return (
    <>
      {graph.type && data.length > 0 && graph.timeFrame ? (
        <>
          {graph.type === "Line" && (
            <LineGraph
              type={graph.type}
              data={data}
              timeFrame={graph.timeFrame}
            />
          )}
          {!graph.type && (
            <LineGraph
              type={graph.type}
              data={data}
              timeFrame={graph.timeFrame}
            />
          )}
          {graph.type === "Bar" && (
            <BarGraph
              type={graph.type}
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
