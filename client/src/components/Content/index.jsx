import { Button, Grid, Input } from "@mui/material";

import { FetchAndReset } from "./FetchAndReset";
import { DataType } from "./Data";
import { GraphType } from "./Graph";
import { TimeAvg } from "./TimeAvg";
import { TimeWindow } from "./TimeWindow";
import { FurtherInfo } from "./FurtherInfo";
import { CSVExport } from "./CSV";

// Define the TableContent component
export const TableContent = (props) => {
  return (
    <Grid xs={12} rowSpaing={2} columnSpacing={1} item container>
      <FetchAndReset
        buttonClick={props.buttonClick}
        graph={props.graph}
        setGraph={props.setGraph}
      />
      <DataType graph={props.graph} setGraph={props.setGraph} />
      <GraphType graph={props.graph} setGraph={props.setGraph} />
      <TimeWindow graph={props.graph} setGraph={props.setGraph} />
      <TimeAvg graph={props.graph} setGraph={props.setGraph} />
      <CSVExport
        graph={props.graph}
        data={props.data}
        setGraph={props.setGraph}
        fullData={props.fullData}
      />
      <FurtherInfo graph={props.graph} setGraph={props.setGraph} />
    </Grid>
  );
};
